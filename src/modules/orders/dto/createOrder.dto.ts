import { IsString, IsNotEmpty, IsArray, IsNumber } from "class-validator";

export class CreateOrderDto{

    @IsArray()
    productIds: [string];
    
    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    urlOfSale: string;

}