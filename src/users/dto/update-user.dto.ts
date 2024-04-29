import { IsString, IsEmail, MinLength, IsNumber, Min, Max, isEmail, IsOptional } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly firstname?: string

    @IsOptional()
    @IsString()
    readonly lastname?: string

    @IsOptional()
    @IsString()
    readonly username?: string

    @IsOptional()
    @IsString()
    readonly email?: string

    @IsOptional()
    @IsEmail()
    readonly password?: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    readonly userSettingsId?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    readonly userRolSettingsId?: number
}