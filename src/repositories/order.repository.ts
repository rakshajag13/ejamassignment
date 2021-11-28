import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Domain } from '../entities/domain.entity';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../modules/orders/dto/createOrder.dto';
import {OrdersGateway} from '../modules/ordersGateway/orders.gateway'


export class OrderRepository {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<Order>,
        @InjectModel(Domain.name)
        private readonly domainModel: Model<Domain>,
        private readonly ordersGateway:OrdersGateway

        
    ) { }

    async createOrder(createOrderDto: CreateOrderDto) {
        const domainExists: any = await this.checkDomain(createOrderDto.urlOfSale);
        console.log(domainExists)

        if (domainExists) {
            let order={
                ...createOrderDto,
                orderId:(Math.floor(Math.random() * 1000000000)).toString()
            }
            const newOrder = new this.orderModel(order);

            try {
                const createdOrder = await newOrder.save();
                
                this.ordersGateway.server.emit('ORDER',createdOrder)
                return createdOrder;
            } catch (error) {
                throw new InternalServerErrorException('DB error', error);
            }
        } else {
            throw new BadRequestException('domain is not active');
        }
    }


    async getOrders(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let Orders: Order[];

        try {
            if (limit === 0) {
                Orders = await this.orderModel
                    .find()
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                Orders = await this.orderModel
                    .find()
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (Orders.length > 0) {
                response = {
                    ok: true,
                    data: Orders,
                    message: 'Get Orders Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: "No  Order's",
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Error in retrieving the Orders', error);
        }
    }

    async getOrderById(orderId: string) {
        try {
            const Order = await this.orderModel.findById(orderId).exec();
            return Order;
        } catch (error) {
            throw new InternalServerErrorException('Order does not exist' + orderId, error);
        }
    }

    async checkDomain(urlOfSale: string) {
        try {
            const domain = await this.domainModel.findOne({ name: urlOfSale });
            return domain && domain.isActive;
        } catch (error) {
            throw new InternalServerErrorException('error in db', error);
        }
    }
}