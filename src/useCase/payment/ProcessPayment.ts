import { Payment } from "../../model/Payment";
import { PaymentService } from "./service/PaymentService";

interface ProcessPaymentDTO {
  correlationID: string;
}

export class ProcessPaymentUseCase {
  constructor(private paymentService: PaymentService) {}

  async execute(data: ProcessPaymentDTO): Promise<Payment> {
    const { correlationID } = data;

    try {
      const payment = await this.paymentService.approvePayment(correlationID);
      return payment;
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      throw new Error("Erro interno no servidor ao processar pagamento");
    }
  }
}
