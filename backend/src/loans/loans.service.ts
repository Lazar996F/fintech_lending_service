import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private readonly userService: UserService,
  ) {}

  async applyForLoan(
    email: string,
    amount: number,
    collateral: string,
  ): Promise<Loan> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const newLoan = new Loan();
    newLoan.user = user;
    newLoan.amount = amount;
    newLoan.collateral = collateral;
    newLoan.status = 'pending';
    newLoan.type = 'borrow';
    return this.loanRepository.save(newLoan);
  }

  async findAll(): Promise<Loan[]> {
    return this.loanRepository.find();
  }
}
