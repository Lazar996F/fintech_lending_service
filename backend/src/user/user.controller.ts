import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Post('supply-liquidity')
  async supplyLiquidity(
    @Body('email') email: string,
    @Body('amount') amount: number,
  ) {
    try {
      return this.userService.reduceBalanceByEmail(email, amount);
    } catch (error) {
      return { message: 'Failed to update balance', error: error.message };
    }
  }
}
