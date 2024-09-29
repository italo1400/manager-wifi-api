import { Request, Response } from "express";
import { RegisterProviderUseCase } from "../useCase/provider/RegisterProviderUseCase";
import { LoginProviderUseCase } from "../useCase/provider/LoginProviderUseCase";

interface RegisterProvider {
  name: string;
  email: string;
  password: string;
}

interface LoginProvider {
  email: string;
  password: string;
}

export class ProviderController {
  private registerProviderUseCase: RegisterProviderUseCase;
  private loginProviderUseCase: LoginProviderUseCase;

  constructor(
    registerProviderUseCase: RegisterProviderUseCase,
    loginProviderUseCase: LoginProviderUseCase
  ) {
    this.registerProviderUseCase = registerProviderUseCase;
    this.loginProviderUseCase = loginProviderUseCase;
  }

  async registerProvider(
    req: Request<{}, {}, RegisterProvider>,
    res: Response
  ): Promise<Response> {
    const provider = req.body;
    try {
      const createdProvider = await this.registerProviderUseCase.execute(
        provider
      );
      return res.status(200).json(createdProvider);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao criar provedor", error });
    }
  }

  async loginProvider(req: Request<{}, {}, LoginProvider>, res: Response) {
    const login = req.body;
    try {
      const provider = await this.loginProviderUseCase.execute(login);
      return res.status(200).json(provider);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao fazer login", error });
    }
  }
}
