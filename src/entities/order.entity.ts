import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ unique: true, required: true, message: 'orderId must be unique' })
  orderId: string;

  @Prop({ default: Date.now })
  createdAt: number;

  @Prop({ default: Date.now })
  orderDate: Date;

  @Prop()
  productIds: [string];

  @Prop()
  currency: string;

  @Prop()
  price: number;

  @Prop()
  urlOfSale: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
