import { Request, Response } from "express";
import { PaymentService } from "../useCase/payment/service/PaymentService";
import { GeneratePaymentUseCase } from "../useCase/payment/GeneratePayment";
import { PaymentApprovalResponse } from "../interfaces";
import { notifyPaymentStatus } from "../socket/payment.socket";

export class PaymentController {
  private paymentService: PaymentService;
  private generatePaymentUseCase: GeneratePaymentUseCase;

  constructor(
    paymentService: PaymentService,
    generatePaymentUseCase: GeneratePaymentUseCase
  ) {
    this.paymentService = paymentService;
    this.generatePaymentUseCase = generatePaymentUseCase;
  }

  async approvePayment(
    req: Request<{}, {}, PaymentApprovalResponse>,
    res: Response
  ): Promise<Response | null> {
    const data = req.body;

    try {
      //@ts-ignore
      if (data.evento === "teste_webhook") {
        return res.status(200).json({ message: "ok" });
      }
      notifyPaymentStatus(data.charge.correlationID, "approved");
      await this.paymentService.approvePayment(data.charge.correlationID);

      return res.status(200).json({ message: "ok" });
    } catch (error: any) {
      console.error("Erro ao aprovar pagamento:", error);
      return res.status(404).json({ message: error.message });
    }
  }

  async listPayments(req: Request, res: Response): Promise<Response> {
    try {
      const payments = await this.paymentService.listPayments();
      return res.status(200).json(payments);
    } catch (error: any) {
      console.error("Erro ao listar pagamentos:", error);
      return res.status(500).json({ message: "Erro ao listar pagamentos" });
    }
  }

  async generatePayment(req: Request, res: Response): Promise<Response> {
    const { correlationID, value, comment, plan_id, mac_address } = req.body;

    try {
      const payment = await this.generatePaymentUseCase.execute({
        correlationID,
        value,
        comment,
        plan_id,
        mac_address,
      });

      return res.status(201).json(payment);
    } catch (error: any) {
      console.error("Erro ao gerar pagamento:", error);
      return res.status(500).json({ message: error.message });
    }
  }
}
