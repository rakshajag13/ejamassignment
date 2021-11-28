import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from '../../repositories/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../entities/order.entity';
import {Domain,DomainSchema} from '../../entities/domain.entity'
import {OrdersGateway} from '../../modules/ordersGateway/orders.gateway'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema },{ name :Domain.name,schema:DomainSchema}])
  ],
  controllers: [OrdersController],
  providers: [OrdersService,OrderRepository,OrdersGateway],

  exports: [OrdersService, OrderRepository,OrdersGateway]
})
export class OrdersModule { }
