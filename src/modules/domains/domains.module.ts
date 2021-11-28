import { Module } from '@nestjs/common';
import { DomainsController } from './domains.controller';
import { DomainsService } from './domains.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Domain,DomainSchema} from '../../entities/domain.entity'
import { DomainRepository } from '../../repositories/domain.repository';

@Module({
  imports:[
    MongooseModule.forFeature([{ name :Domain.name,schema:DomainSchema}])
  ],
  controllers: [DomainsController],
  providers: [DomainsService,DomainRepository],
  exports:[DomainsService,DomainRepository]
})

export class DomainsModule {}
