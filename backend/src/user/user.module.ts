// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service'; // Import AuthService
import { FinancialDetails } from './financial-details.entity';
import { Loan } from '../loans/loan.entity';
import { LoansService } from '../loans/loans.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FinancialDetails, Loan])],
  providers: [UserService, AuthService, LoansService],
  controllers: [UserController],
  exports: [UserService, AuthService, LoansService],
})
export class UserModule {}
