import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../repositories/order.repository';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetQueryDto } from '../../dto/getQueryDto';


@Injectable()
export class OrdersService {
    constructor(private readonly orderRepository: OrderRepository) { }

    async createOrder(createOrderDto: CreateOrderDto) {
        return this.orderRepository.createOrder(createOrderDto)
    }

    async getOrders(query: GetQueryDto) {
        return this.orderRepository.getOrders(query)
    }
}
