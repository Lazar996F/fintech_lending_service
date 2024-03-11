import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FinancialDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  totalEarnedFees: number;

  @Column({ default: 0 })
  outstandingDebt: number;

  @OneToOne(() => User, (user) => user.financialDetails)
  @JoinColumn()
  user: User;
}
