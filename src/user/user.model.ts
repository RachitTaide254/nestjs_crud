import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  firstName: string;
  
  @Prop()
  email: string;

  @Prop()
  userName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
