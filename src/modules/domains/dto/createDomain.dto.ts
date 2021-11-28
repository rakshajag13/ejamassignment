import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateDomainDto{

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

}