import { Injectable } from '@nestjs/common';
import { DomainRepository } from '../../repositories/domain.repository';
import { CreateDomainDto } from './dto/createDomain.dto';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { UpdateDomainDto } from './dto/updateDomain.dto';

@Injectable()
export class DomainsService {

    constructor(private readonly domainRepository: DomainRepository) { }

    async createDomain(createDomainDto: CreateDomainDto) {
        return this.domainRepository.createDomain(createDomainDto)
    }
    async updateDomain(id: MongooseSchema.Types.ObjectId, updateDomainDto: UpdateDomainDto) {
        return this.domainRepository.updateDomain(id, updateDomainDto)
    }
    async deleteDomain(id: MongooseSchema.Types.ObjectId) {
        return this.domainRepository.deleteDomain(id)
    }
    async getDomains(query: GetQueryDto) {
        return this.domainRepository.getDomains(query)
    }
}
