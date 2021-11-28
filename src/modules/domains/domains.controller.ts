import { Controller, Post, Body, HttpStatus, Put, Param, Get, Query, Delete } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/createDomain.dto';
import { Res } from '@nestjs/common'
import { Schema as MongooseSchema } from 'mongoose';
import { UpdateDomainDto } from './dto/updateDomain.dto';
import { GetQueryDto } from 'src/dto/getQueryDto';

@Controller('domains')
export class DomainsController {

    constructor(private readonly domainService: DomainsService) { }

    @Post()
    async createDomain(@Body() createDomainDto: CreateDomainDto, @Res() res: any) {
        const newDomain = await this.domainService.createDomain(createDomainDto);
        return res.status(HttpStatus.OK).send(newDomain)

    }
    @Put('/:id')
    async updateDomain(
        @Param('id') id: MongooseSchema.Types.ObjectId,
        @Body() updateDomainDto: UpdateDomainDto, @Res() res: any) {
        const updatedDomain = await this.domainService.updateDomain(id, updateDomainDto);
        return res.status(HttpStatus.OK).send(updatedDomain)

    }

    @Get()
    async getDomains(@Query() query:GetQueryDto,@Res() res: any){
        const domains=await this.domainService.getDomains(query);
        return res.status(HttpStatus.OK).send(domains)
    }
    
    @Delete('/:id')
    async deleteDomain(@Param('id') id: MongooseSchema.Types.ObjectId,@Res() res:any){
        const deletedDomain= await this.domainService.deleteDomain(id);
        return res.status(HttpStatus.OK).send(deletedDomain)
    }
}
