import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity'; // Import the User entity
import { LoansModule } from './loans/loans.module';
import { Loan } from './loans/loan.entity';
import { FinancialDetails } from './user/financial-details.entity';
import { LoansController } from './loans/loans.controller';
import { LoansService } from './loans/loans.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lending_app_user',
      password: 'lending_app_password',
      database: 'lending_app_db',
      entities: [User, Loan, FinancialDetails],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Loan]),
    UserModule,
    LoansModule,
  ],
  controllers: [AppController, LoansController],
  providers: [AppService, LoansService],
})
export class AppModule {}
