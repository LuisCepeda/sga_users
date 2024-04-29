import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    username: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    userSettingsId: number

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    userRolSettingsId: number
}