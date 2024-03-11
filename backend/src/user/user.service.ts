import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { FinancialDetails } from './financial-details.entity';
import { LoansService } from '../loans/loans.service';
import { Loan } from '../loans/loan.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FinancialDetails)
    private readonly financialDetailsRepository: Repository<FinancialDetails>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async findOrCreateFinancialDetails(user: User): Promise<FinancialDetails> {
    let financialDetails = await this.financialDetailsRepository.findOne({
      where: { user },
    });

    if (!financialDetails) {
      financialDetails = new FinancialDetails();
      financialDetails.user = user;
      financialDetails =
        await this.financialDetailsRepository.save(financialDetails);
    }

    return financialDetails;
  }

  async createUser(email: string, password: string): Promise<any> {
    const user = new User();
    user.email = email;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;

    // Save the user
    const savedUser = await this.userRepository.save(user);

    // Create and save initial financial details
    const initialBalance = 1000;
    const financialDetails = new FinancialDetails();
    financialDetails.balance = initialBalance;
    financialDetails.user = savedUser;
    const savedFinDetails =
      await this.financialDetailsRepository.save(financialDetails);

    return { ...savedUser, financialDetails: savedFinDetails };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async reduceBalanceByEmail(email: string, amount: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const financialDetails = await this.findOrCreateFinancialDetails(user);

    financialDetails.balance -= amount;

    const userData = await this.userRepository.save(user);
    const finData =
      await this.financialDetailsRepository.save(financialDetails);

    // Create a new loan record
    const loan = this.loanRepository.create({
      amount: amount,
      type: 'lend',
      status: 'active',
      user: userData,
    });
    await this.loanRepository.save(loan);

    return {
      user: userData,
      financialDetails: finData,
    };
  }

  async withdrawCurrencyHandler(
    email: string,
    loanAmount: number,
  ): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      const financialDetails = await this.findOrCreateFinancialDetails(user);

      financialDetails.balance += loanAmount;

      const userData = await this.userRepository.save(user);
      const finData =
        await this.financialDetailsRepository.save(financialDetails);

      return {
        success: true,
        user: userData,
        financialDetails: finData,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async repayLoan(
    email: string,
    amountForRepay: number,
    loanId: number,
  ): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      const loan = await this.loanRepository.findOne({ where: { id: loanId } });
      if (!loan) {
        throw new Error('Loan not found');
      }

      // Decrease the loan amount
      loan.amount -= amountForRepay;

      // Save the updated loan record
      await this.loanRepository.save(loan);

      if (!user) {
        throw new Error('User not found');
      }

      const financialDetails = await this.findOrCreateFinancialDetails(user);

      financialDetails.balance -= amountForRepay;

      const userData = await this.userRepository.save(user);
      const finData =
        await this.financialDetailsRepository.save(financialDetails);

      return {
        success: true,
        user: userData,
        financialDetails: finData,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const userDetails = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.financialDetails', 'financialDetails')
      .leftJoinAndSelect('user.loans', 'loans')
      .where('user.email = :email', { email })
      .getOne();

    if (!userDetails) {
      return undefined;
    }

    const outstandingDebt = userDetails.loans
      .filter(
        (loanInfo) =>
          loanInfo.type === 'borrow' && loanInfo.status !== 'pending',
      )
      .reduce((total, loan) => total + loan.amount, 0);

    const totalEarnedFees = userDetails.loans
      .filter((loan) => loan.type === 'lend' && loan.status === 'active')
      .reduce(
        (total, loan) => total + this.getCalculatedLendProfit(loan.amount),
        0,
      );

    userDetails.financialDetails.totalEarnedFees = totalEarnedFees;
    userDetails.financialDetails.outstandingDebt = outstandingDebt;

    return userDetails;
  }

  getCalculatedLendProfit(loanAmount: number): number {
    return loanAmount * 0.194;
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
