import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) , JwtModule.register({}),],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy]
})
export class AuthModule {}
