import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Plan } from "./Plan";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  value: number;

  @Column({ type: "varchar", length: 50 })
  payment_status: string;

  @Column({ type: "varchar", length: 17 })
  mac_address: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  qr_code: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  pix_key: string

  @Column({ type: "varchar", length: 255, nullable: true })
  payment_link_url: string

  @Column({ type: "varchar", length: 255, nullable: true })
  transaction_id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  correlation_id: string;

  @Column({ type: "timestamp", nullable: true })
  payment_approved_at: Date;

  @Column({ type: "timestamp", nullable: true })
  expires_date: Date;

  @ManyToOne(() => Plan)
  @JoinColumn({ name: "plan_id" })
  plan: Plan;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
