import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { Loan } from './loan.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { FinancialDetails } from '../user/financial-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, User, FinancialDetails])],
  controllers: [LoansController],
  providers: [LoansService, UserService],
  exports: [LoansService, UserService],
})
export class LoansModule {}
