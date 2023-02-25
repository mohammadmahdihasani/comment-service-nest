import { IsString } from 'class-validator';
export class LikeCommentDto {
  @IsString({ message: 'شماره کامنت باید وارد شود' })
  comment_id: string;
}
