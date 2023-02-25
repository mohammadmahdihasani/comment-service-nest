import { Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwt: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<object> {
    registerAuthDto.password = await bcrypt.hash(registerAuthDto.password, 10); //
    try {
      const result = await this.userModel.create(registerAuthDto);
      if (!result) {
        return {
          success: false,
          message: 'نام کاربری از قبل موجود می باشد',
        };
      }
      return {
        success: true,
        message: 'حساب کاربری شما با موفقیت ایجاد شد',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'نام کاربری از قبل موجود می باشد',
      });
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<object> {
    const result = await this.userModel.findOne({
      user_name: loginAuthDto.user_name,
    });
    if (!result) {
      return {
        success: false,
        message: 'نام کاربری یا رمز عبور اشتباه می باشد',
      };
    }
    const isMatchPassword = await bcrypt.compare(
      loginAuthDto.password,
      result.password,
    );
    if (!isMatchPassword) {
      return {
        success: false,
        message: 'نام کاربری یا رمز عبور اشتباه می باشد',
      };
    }
    return {
      success: true,
      message: 'با موفقیت وارد حساب کاربری خود شدید',
      token: await this.signToken(
        result._id,
        result.first_name,
        result.last_name,
      ),
    };
  }

  async signToken(
    _id: any,
    firstName: string,
    lastName: string,
  ): Promise<string> {
    const payload = { _id, firstName, lastName };
    return await this.jwt.signAsync(payload, {
      secret: process.env.JWT_TOKEN,
      expiresIn: '2d',
    });
  }
}
