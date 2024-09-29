import { ProviderService } from "./service/ProviderService";
import { Provider } from "../../model/Providers";
import bcrypt from "bcrypt";

interface LoginProviderData {
  email: string;
  password: string;
}

export class LoginProviderUseCase {
  private providerService: ProviderService;

  constructor(providerService: ProviderService) {
    this.providerService = providerService;
  }

  async execute(data: LoginProviderData): Promise<Provider> {
    const provider = await this.providerService.findProviderByEmail(data.email);

    if (!provider) {
      throw new Error("Credenciais inválidas.");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      provider.password
    );

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas.");
    }

    return provider;
  }
}
