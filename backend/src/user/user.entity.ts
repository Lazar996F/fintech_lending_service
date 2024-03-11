import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Loan } from '../loans/loan.entity';

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
}
