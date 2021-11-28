import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DomainsController } from './modules/domains/domains.controller';
import { DomainsModule } from './modules/domains/domains.module';
import { OrdersModule } from './modules/orders/orders.module';
import {OrdersGatewayModule} from './modules/ordersGateway/orders.gateway.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    DomainsModule,
    OrdersModule,
    OrdersGatewayModule
  ],
  controllers: [AppController, DomainsController],
  providers: [AppService],
})
export class AppModule {}
