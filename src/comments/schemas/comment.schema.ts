import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  user: object;

  @Prop({ type: mongoose.Schema.Types.String })
  text: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  likes: string[];

  @Prop({ type: () => [Comment] })
  replies: Comment[];

  @Prop({ default: Date.now })
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
