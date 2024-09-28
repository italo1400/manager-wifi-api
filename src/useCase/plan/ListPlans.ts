import { PlanService } from "./service/PlanService";
import { Plan } from "../../model/Plan";

export class ListPlansUseCase {
  private planService: PlanService;

  constructor(planService: PlanService) {
    this.planService = planService;
  }

  async execute(): Promise<Plan[]> {
    return await this.planService.listPlans();
  }
}
