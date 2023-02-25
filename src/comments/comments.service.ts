import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikeCommentDto, ReplayCommentDto } from './dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: object,
  ): Promise<object> {
    const createComment = this.commentModel.create({
      text: createCommentDto.text,
      user: user,
    });
    if (!createComment) {
      throw new BadRequestException({
        success: false,
        message: 'ثبت نظر با خطا مواجه شد',
      });
    }
    return await {
      success: true,
      message: 'نظر شما با موفقیت ثبت شد',
    };
  }

  async findAll(): Promise<object> {
    return await this.commentModel.find();
  }

  async like(
    likeCommentDto: LikeCommentDto,
    user: object,
  ): Promise<object | boolean> {
    const result = await this.commentModel.findOne({
      _id: likeCommentDto.comment_id,
    });
    let mamad = false;
    result.likes.forEach((val) => {
      if (val['_id'] == user['_id']) {
        mamad = true;
      }
    });
    if (!mamad) {
      const likeCommentQuery = await this.commentModel.findOneAndUpdate(
        { _id: likeCommentDto.comment_id },
        {
          $push: { likes: user },
        },
      );
      if (!likeCommentQuery) {
        throw new BadRequestException({
          success: false,
          message: 'سرویس با خطا مواجه شد',
        });
      }
      return {
        success: true,
        like: true,
        message: 'لایک با موفقیت انجام شد',
      };
    }
    const disLikeCommentQuery = await this.commentModel.findOneAndUpdate(
      { _id: likeCommentDto.comment_id },
      { $pull: { likes: { _id: user['_id'] } } },
      { safe: true, multi: false },
    );
    if (!disLikeCommentQuery) {
      throw new BadRequestException({
        success: false,
        message: 'سرویس با خطا مواجه شد',
      });
    }
    return {
      success: true,
      disLike: true,
      message: 'کامنت دیسلایک شد',
    };
  }

  async replay(
    replayCommentDto: ReplayCommentDto,
    user: object,
  ): Promise<object> {
    const createComment = await this.commentModel.create({
      text: replayCommentDto.text,
      user: user,
    });
    if (!createComment) {
      throw new BadRequestException({
        success: false,
        message: 'ثبت نظر با خطا مواجه شد',
      });
    }
    const result = await this.commentModel.findOneAndUpdate(
      {
        _id: replayCommentDto.comment_id,
      },
      {
        $push: { replies: createComment },
      },
    );

    return result;
  }
}
