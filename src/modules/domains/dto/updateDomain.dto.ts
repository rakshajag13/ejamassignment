import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateDomainDto{

    @IsString()
    @IsNotEmpty()
    name?: string;
    
    @IsBoolean()
    @IsNotEmpty()
    isActive?: boolean;

}