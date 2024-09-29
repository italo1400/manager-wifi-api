import { ProviderService } from "./service/ProviderService";
import { Provider } from "../../model/Providers";
import bcrypt from "bcrypt";

export class RegisterProviderUseCase {
  private providerService: ProviderService;

  constructor(providerService: ProviderService) {
    this.providerService = providerService;
  }

  async execute(data: {
    name: string;
    contact_info?: string;
    address?: string;
    status?: string;
    email: string;
    password: string;
  }): Promise<Provider> {
    const existingProvider = await this.providerService.findProviderByEmail(
      data.email
    );
    if (existingProvider) {
      throw new Error("Um provedor com este email já existe.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const providerData = {
      ...data,
      password: hashedPassword,
    };

    return await this.providerService.createProvider(providerData);
  }
}
