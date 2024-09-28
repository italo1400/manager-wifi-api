import { Router } from "express";
import { PaymentController } from "../controller/payment.controller";
import { PaymentService } from "../useCase/payment/service/PaymentService";
import { GeneratePaymentUseCase } from "../useCase/payment/GeneratePayment";

const paymentService = new PaymentService();
const generatePaymentUseCase = new GeneratePaymentUseCase(paymentService);
const paymentController = new PaymentController(
  paymentService,
  generatePaymentUseCase
);

const router = Router();

router.post("/generate", async (req, res) =>
  paymentController.generatePayment(req, res)
);
router.post("/approve", async (req, res) =>
  paymentController.approvePayment(req, res)
);
router.get("/", async (req, res) =>
  paymentController.listPayments(req, res)
);

export default router;
