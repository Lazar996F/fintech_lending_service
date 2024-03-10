import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity'; // Import the User entity

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'poll_user',
      password: 'poll_password',
      database: 'poll_db',
      entities: [User], // Include the User entity here
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), // Include the User entity here as well
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
