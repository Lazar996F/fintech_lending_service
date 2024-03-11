import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('user/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthGuard)
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
