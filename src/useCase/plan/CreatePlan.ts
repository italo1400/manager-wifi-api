import { PlanService } from "./service/PlanService";
import { Plan } from "../../model/Plan";

export class CreatePlanUseCase {
  private planService: PlanService;

  constructor(planService: PlanService) {
    this.planService = planService;
  }

  async execute(planData: Partial<Plan>): Promise<Plan> {
    return await this.planService.createPlan(planData);
  }
}
