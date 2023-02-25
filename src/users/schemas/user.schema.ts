import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;
  
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({unique:true})
  user_name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
