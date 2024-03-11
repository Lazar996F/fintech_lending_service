// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service'; // Import AuthService
import { FinancialDetails } from './financial-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FinancialDetails])],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService, AuthService],
})
export class UserModule {}
