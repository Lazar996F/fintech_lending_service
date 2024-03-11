import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async signUp(email: string, password: string): Promise<any> {
    const existingUser = await this.userService.getUserByEmail(email);

    if (!existingUser) {
      await this.userService.createUser(email, password);
      const newUser = await this.userService.getUserByEmail(email);
      const accessToken = await this.generateAccessToken(newUser);
      return {
        ...newUser,
        accessToken,
      };
    }

    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const accessToken = await this.generateAccessToken(existingUser);
    return {
      ...existingUser,
      accessToken,
    };
  }
}
