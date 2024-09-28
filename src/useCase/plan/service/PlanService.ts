import { Plan } from "../../../model/Plan";
import { AppDataSource } from "../../../data-source";

export class PlanService {
  private planRepository = AppDataSource.getRepository(Plan);

  constructor() {}

  async createPlan(planData: Partial<Plan>): Promise<Plan> {
    const plan = this.planRepository.create(planData);
    return await this.planRepository.save(plan);
  }

  async listPlans(): Promise<Plan[]> {
    return await this.planRepository.find();
  }
}
