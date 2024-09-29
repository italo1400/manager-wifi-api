import { EntityRepository, Repository } from "typeorm";
import { Provider } from "../../../model/Providers";

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {}
