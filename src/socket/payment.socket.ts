import { io } from "../app";

export const notifyPaymentStatus = (correlationID: string, status: string) => {
  io.emit(`payment_status`, { correlationID, status });
};
