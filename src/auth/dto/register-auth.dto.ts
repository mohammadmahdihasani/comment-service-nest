import { IsEmail, Length, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString({ message: 'نام باید الزامی باشد' })
  first_name: string;

  @IsString({ message: 'نام خانوادگی الزامی باشد' })
  last_name: string;

  @IsString({ message: 'نام کاربری الزامی باشد' })
  user_name: string;

  @Length(8, 10, { message: 'رمز عبور بین 8 تا 10 کاراکتر باشد' })
  password: string;

  @IsEmail({}, { message: 'ایمیل الزامی می باشد' })
  email: string;
}
