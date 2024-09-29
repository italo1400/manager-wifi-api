import { AppDataSource } from "../../../data-source";
import { Provider } from "../../../model/Providers";

export class ProviderService {
  private providerRepository = AppDataSource.getRepository(Provider);

  constructor() {}

  async createProvider(data: {
    name: string;
    contact_info?: string;
    address?: string;
    status?: string;
    email: string;
    password: string;
  }): Promise<Provider> {
    const provider = this.providerRepository.create(data);
    await this.providerRepository.save(provider);
    return provider;
  }

  async findProviderByEmail(email: string): Promise<Provider | null> {
    return await this.providerRepository.findOne({ where: { email } });
  }
}
