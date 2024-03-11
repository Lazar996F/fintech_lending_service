import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('supply-liquidity')
  async supplyLiquidity(
    @Body('email') email: string,
    @Body('amount') amount: number,
  ) {
    try {
      await this.userService.reduceBalanceByEmail(email, amount);
      return { message: 'Balance updated successfully' };
    } catch (error) {
      return { message: 'Failed to update balance', error: error.message };
    }
  }
}
