import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DomainDocument = Domain & Document;

@Schema()
export class Domain {
  @Prop({ required: true, unique: true, message: 'Name must be unique' })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  isActive: boolean;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
