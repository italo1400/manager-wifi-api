import { Router } from "express";
import { PlanService } from "../useCase/plan/service/PlanService";
import { CreatePlanUseCase } from "../useCase/plan/CreatePlan";
import { ListPlansUseCase } from "../useCase/plan/ListPlans";
import { PlanController } from "../controller/planController";

const planService = new PlanService();
const createPlanUseCase = new CreatePlanUseCase(planService);
const listPlansUseCase = new ListPlansUseCase(planService);
const planController = new PlanController(createPlanUseCase, listPlansUseCase);

const router = Router();

router.post("/", (req, res) => planController.createPlan(req, res));
router.get("/", (req, res) => planController.listPlans(req, res));

export default router;
