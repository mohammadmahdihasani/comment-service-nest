import { IsString } from 'class-validator';
export class CreateCommentDto {
  @IsString({ message: 'متن نظر الزامی می باشد' })
  text: string;
}
