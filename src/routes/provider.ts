import { Router } from "express";
import { ProviderService } from "../useCase/provider/service/ProviderService";
import { RegisterProviderUseCase } from "../useCase/provider/RegisterProviderUseCase";
import { ProviderController } from "../controller/providerController";
import { LoginProviderUseCase } from "../useCase/provider/LoginProviderUseCase";

const providerService = new ProviderService();
const registerProviderUseCase = new RegisterProviderUseCase(providerService);
const loginProviderUseCase = new LoginProviderUseCase(providerService);
const providerController = new ProviderController(
  registerProviderUseCase,
  loginProviderUseCase
);
const router = Router();

router.post("/", (req, res) => providerController.registerProvider(req, res));
router.post("/login", (req, res) => providerController.loginProvider(req, res));

export default router;
