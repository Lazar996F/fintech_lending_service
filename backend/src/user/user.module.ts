// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService], // Include AuthService
  controllers: [UserController],
  exports: [UserService, AuthService],
})
export class UserModule {}
