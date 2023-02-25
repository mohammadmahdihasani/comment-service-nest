import { IsString } from 'class-validator';
export class LoginAuthDto {
  @IsString({ message: 'نام کاربری الزامی می باشد' })
  user_name: string;

  @IsString({ message: 'رمز عبور الزامی می باشد' })
  password: string;
}
