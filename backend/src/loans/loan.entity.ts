import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: 'lend' | 'borrow';

  @Column()
  status: 'active' | 'pending' | 'completed' | 'withdrawn';

  @ManyToOne(() => User, (user) => user.loans)
  user: User;

  @Column({ nullable: true })
  collateral?: string;
}
