import { Request, Response } from "express";
import { CreatePlanUseCase } from "../useCase/plan/CreatePlan";
import { ListPlansUseCase } from "../useCase/plan/ListPlans";

export class PlanController {
  private createPlanUseCase: CreatePlanUseCase;
  private listPlansUseCase: ListPlansUseCase;

  constructor(
    createPlanUseCase: CreatePlanUseCase,
    listPlansUseCase: ListPlansUseCase
  ) {
    this.createPlanUseCase = createPlanUseCase;
    this.listPlansUseCase = listPlansUseCase;
  }

  async createPlan(req: Request, res: Response): Promise<Response> {
    const planData = req.body;

    try {
      const plan = await this.createPlanUseCase.execute(planData);
      return res.status(201).json(plan);
    } catch (error: any) {
      console.error("Erro ao criar plano:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async listPlans(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await this.listPlansUseCase.execute();
      return res.status(200).json(plans);
    } catch (error: any) {
      console.error("Erro ao listar planos:", error);
      return res.status(500).json({ message: "Erro ao listar planos" });
    }
  }
}
