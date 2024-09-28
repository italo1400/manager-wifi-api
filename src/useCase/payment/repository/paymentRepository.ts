import { EntityRepository, Repository } from "typeorm";
import { Payment } from "../../../model/Payment"; 

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {}
