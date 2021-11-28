import { Controller, Post, Body, HttpStatus, Put, Param, Get, Query, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Res } from '@nestjs/common';
import { GetQueryDto } from 'src/dto/getQueryDto';

@Controller('orders')
export class OrdersController {

    constructor(private readonly orderService: OrdersService) { }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: any) {
        const newOrder = await this.orderService.createOrder(createOrderDto);
        return res.status(HttpStatus.OK).send(newOrder)

    }
  
    @Get()
    async getOrders(@Query() query:GetQueryDto,@Res() res: any){
        const orders=await this.orderService.getOrders(query);
        return res.status(HttpStatus.OK).send(orders)
    } 
}
