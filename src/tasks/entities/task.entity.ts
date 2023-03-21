import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from "mongoose";


export enum TaskStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
}

@Schema()
export class Task extends Document{
  @Prop()
  id: string;

  @Prop()
  date: Date;

  @Prop({required: true})
  title: string;
  
  @Prop()
  description: string;

  @Prop({index: true})
  status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task);