import { EntityRepository, Repository } from "typeorm";
import { Plan } from "../../../model/Plan";

@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {}
