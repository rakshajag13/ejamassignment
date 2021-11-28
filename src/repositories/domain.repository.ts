import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Domain } from '../entities/domain.entity';
import { CreateDomainDto } from '../modules/domains/dto/createDomain.dto';
import { UpdateDomainDto } from '../modules/domains/dto/updateDomain.dto';

export class DomainRepository {
    constructor(
        @InjectModel(Domain.name)
        private readonly domainModel: Model<Domain>,
    ) { }

    async createDomain(createDomainDto: CreateDomainDto) {
        const domainExists: any = await this.getDomainByName(createDomainDto.name);
        console.log(domainExists)

        if (!domainExists || !domainExists.name) {
            const newDomain = new this.domainModel({
                name: createDomainDto.name,
                isActive: createDomainDto.isActive,

            });

            try {
                const createdDomain = await newDomain.save();
                return createdDomain;
            } catch (error) {
                throw new InternalServerErrorException('DB error', error);
            }
        } else {
            throw new ConflictException('already exist');
        }
    }
    async updateDomain(id: MongooseSchema.Types.ObjectId, updateDomainDto: UpdateDomainDto) {
        const domainExists: any = await this.getDomainById(id);

        if (domainExists && domainExists.name) {

            if (updateDomainDto.name)
                domainExists.name = updateDomainDto.name;

            if (updateDomainDto.isActive === false || updateDomainDto.isActive === true)
                domainExists.isActive = updateDomainDto.isActive;
                
            try {
                const updatedDomain = await domainExists.save();
                return updatedDomain;
            } catch (error) {
                throw new InternalServerErrorException('DB error', error);
            }
        } else {
            throw new ConflictException('does not  exist');
        }
    }

    async deleteDomain(id: MongooseSchema.Types.ObjectId) {
        try {
            let record = await this.domainModel.findByIdAndRemove(id)
            if (!record || !record.name) {
                let response = {
                    ok: true,
                    data: null,
                    message: "Domain does not exist",
                };
                return response
            }
            return record
        } catch (error) {
            throw new InternalServerErrorException('DB error', error);
        }


    }

    async getDomains(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let domains: Domain[];

        try {
            if (limit === 0) {
                domains = await this.domainModel
                    .find()
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                domains = await this.domainModel
                    .find()
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (domains.length > 0) {
                response = {
                    ok: true,
                    data: domains,
                    message: 'Get Domains Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: "No  Domain's",
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Error in retrieving the domains', error);
        }
    }

    async getDomainById(id: MongooseSchema.Types.ObjectId) {
        try {
            const domain = await this.domainModel.findById(id).exec();

            return domain;
        } catch (error) {
            throw new InternalServerErrorException('domain does not exist' + id, error);
        }
    }

    async getDomainByName(name: string) {
        try {
            const domain = await this.domainModel.findOne({ name });
            return domain;
        } catch (error) {
            throw new InternalServerErrorException('error in db', error);
        }
    }
}