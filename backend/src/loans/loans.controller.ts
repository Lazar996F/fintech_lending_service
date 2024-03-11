import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('loans')
@Controller('loans')
export class LoansController {
  constructor(
    private readonly loanService: LoansService,
    private readonly userService: UserService,
  ) {}

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

  @Put('/:id')
  async withdrawLoan(
    @Param('id') id: number,
    @Body('email') email: string,
  ): Promise<any> {
    // Find the loan by ID
    const loan = await this.loanService.findLoanById(id);

    loan.status = 'withdrawn';
    await this.loanService.updateLoan(loan);

    // Increase the user's balance by the withdrawn amount

    await this.loanService.withdrawLoanHandler(email, loan.amount);

    return { message: 'Loan withdrawn successfully' };
  }

  @Put('repay/:id')
  async repayLoan(
    @Param('id') id: number,
    @Body('email') email: string,
    @Body('repayAmount') repayAmount: number,
  ): Promise<any> {
    await this.loanService.repayLoanHandler(email, repayAmount, id);

    return { message: 'Loan repaid successfully' };
  }
}
