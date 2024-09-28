import { PaymentService } from "./service/PaymentService";

interface OpenPixResponse {
  charge: {
    value: number;
    comment: string;
    identifier: string;
    correlationID: string;
    transactionID: string;
    status: string;
    additionalInfo: Array<any>;
    fee: number;
    discount: number;
    valueWithDiscount: number;
    expiresDate: string;
    type: string;
    paymentLinkID: string;
    createdAt: string;
    updatedAt: string;
    brCode: string;
    expiresIn: number;
    pixKey: string;
    paymentLinkUrl: string;
    qrCodeImage: string;
    globalID: string;
    paymentMethods: {
      pix: {
        additionalInfo: Array<any>;
      };
    };
  };
  correlationID: string;
  brCode: string;
}

interface GeneratePaymentDTO {
  correlationID: string;
  value: number;
  comment: string;
  plan_id: number;
  mac_address: string;
}

export class GeneratePaymentUseCase {
  constructor(private paymentService: PaymentService) {}

  async execute(data: GeneratePaymentDTO): Promise<any> {
    const { correlationID, value, comment, plan_id, mac_address } = data;

    try {
      const response = await fetch(
        "https://api.openpix.com.br/api/v1/charge?return_existing=true",
        {
          method: "POST",
          headers: {
            Authorization:
              "Q2xpZW50X0lkX2NlMTMzYjA3LWFmYWQtNDAwZS05OGE3LTAxMWQyZWRmMjVlYTpDbGllbnRfU2VjcmV0X3RNeEVYNlkxRzVpQnJOUWhtMERORVVBUkF6VExJTTg1RjJzYlAxU1ZNN2c9",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            correlationID,
            value,
            comment,
            expiresIn: 600,
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(
          `Falha ao gerar pagamento: ${JSON.stringify(errorBody)}`
        );
      }

      const responseData: OpenPixResponse = await response.json();

      const payment = await this.paymentService.createPayment({
        correlation_id: correlationID,
        value,
        mac_address,
        qr_code: responseData.brCode,
        plan_id,
        expires_date: responseData.charge.expiresDate,
        payment_link_url: responseData.charge.paymentLinkUrl,
        pix_key: responseData.charge.pixKey,
        transaction_id: responseData.charge.transactionID,
      });

      return payment;
    } catch (error) {
      console.error("Erro ao gerar pagamento:", error);
      throw new Error("Erro interno no servidor ao gerar pagamento");
    }
  }
}
