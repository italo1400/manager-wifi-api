import { Payment } from "../../../model/Payment";
import { Plan } from "../../../model/Plan";
import { AppDataSource } from "../../../data-source";

interface CreatePaymentDTO {
  mac_address: string;
  qr_code?: string;
  plan_id: number;
  correlation_id?: string;
  value: number;
  pix_key: string;
  payment_link_url: string;
  transaction_id: string;
  expires_date: string;
}

export class PaymentService {
  private paymentRepository = AppDataSource.getRepository(Payment);
  private planRepository = AppDataSource.getRepository(Plan);

  constructor() {}

  async createPayment(data: CreatePaymentDTO): Promise<Payment> {
    const {
      plan_id,
      value,
      mac_address,
      qr_code,
      correlation_id,
      expires_date,
      payment_link_url,
      pix_key,
      transaction_id,
    } = data;

    const plan = await this.planRepository.findOneOrFail({
      where: { id: plan_id },
    });

    if (!plan) {
      throw new Error("Plan not found");
    }

    if (plan.price !== value) {
      throw new Error("Invalid amount for the selected plan");
    }

    const payment = this.paymentRepository.create({
      value,
      mac_address,
      qr_code,
      correlation_id,
      plan,
      payment_status: "pending",
      expires_date,
      payment_link_url,
      pix_key,
      transaction_id,
    });

    return await this.paymentRepository.save(payment);
  }

  async approvePayment(correlationId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({
      correlation_id: correlationId,
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.payment_status = "approved";
    payment.payment_approved_at = new Date();

    return await this.paymentRepository.save(payment);
  }

  async listPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ["plan"],
      order: { created_at: "DESC" },
    });
  }
}
