import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { FinancialDetails } from './financial-details.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FinancialDetails)
    private readonly financialDetailsRepository: Repository<FinancialDetails>,
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
    const hashedPassword = await bcrypt.hash(password, 10);
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

  async reduceBalanceByEmail(email: string, amount: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const financialDetails = await this.findOrCreateFinancialDetails(user);

    financialDetails.balance -= amount;

    await this.userRepository.save(user);
    await this.financialDetailsRepository.save(financialDetails);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.financialDetails', 'financialDetails')
      .where('user.email = :email', { email })
      .getOne();
  }
}
