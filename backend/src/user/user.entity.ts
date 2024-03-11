import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Loan } from '../loans/loan.entity';
import { FinancialDetails } from './financial-details.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @OneToOne(
    () => FinancialDetails,
    (financialDetails) => financialDetails.user,
    {
      cascade: true,
    },
  )
  financialDetails: FinancialDetails;
}
