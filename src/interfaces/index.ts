interface TaxID {
  value: string;
}

interface Customer {
  name: string;
  taxID: TaxID[];
  correlationID: string;
}

interface Charge {
  value: number;
  comment: string;
  identifier: string;
  correlationID: string;
  transactionID: string;
  status: string;
  additionalInfo: any[];
  fee: number;
  discount: number;
  valueWithDiscount: number;
  expiresDate: string;
  type: string;
  paymentLinkID: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  paidAt: string;
  payer: Customer;
  brCode: string;
  expiresIn: number;
  pixKey: string;
  paymentLinkUrl: string;
  qrCodeImage: string;
  globalID: string;
}

interface Pix {
  customer: Customer;
  payer: Customer;
  charge: Charge;
  value: number;
  time: string;
  endToEndId: string;
  transactionID: string;
  infoPagador: string;
  type: string;
  createdAt: string;
  globalID: string;
}

interface Company {
  id: string;
  name: string;
  taxID: string;
}

export interface PaymentApprovalResponse {
  event: string;
  charge: Charge;
  pix: Pix;
  company: Company;
  account: Record<string, unknown>;
}
