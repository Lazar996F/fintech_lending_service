import { Controller, Get, Post, Body } from '@nestjs/common';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loanService: LoansService) {}

  @Get()
  async getAllLoans(): Promise<Loan[]> {
    return this.loanService.findAll();
  }

  @Post('apply')
  async applyForLoan(
    @Body('email') email: string,
    @Body('amount') amount: number,
    @Body('collateral') collateral: string,
  ) {
    try {
      const loan = await this.loanService.applyForLoan(
        email,
        amount,
        collateral,
      );
      return { success: true, loan };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
