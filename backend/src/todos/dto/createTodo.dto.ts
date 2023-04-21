import { Transform, Type } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateNested, isNumber, isString } from "class-validator";

class SectionDto {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string
}



export class CreateTodoDto {
    @IsString()
    @MinLength(1)
    content: string

    @IsString()
    @MinLength(1)
    title: string

    @IsOptional()
    @IsISO8601()
    date?: string

   
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => SectionDto)
    section?: SectionDto

}