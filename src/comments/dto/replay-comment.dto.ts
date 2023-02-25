import { IsString } from 'class-validator';

export class ReplayCommentDto {
  @IsString({ message: 'نظر خود را وارد کنید' })
  text: string;

  @IsString({ message: 'شماره نظر را وارد کنید' })
  comment_id: string;
}
