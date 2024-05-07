import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({ description: 'The firstname of the user', example: 'Luis' })
    @IsNotEmpty()
    @IsString()
    firstname: string

    @ApiProperty({ description: 'The last name of the user', example: 'Cepeda' })
    @IsNotEmpty()
    @IsString()
    lastname: string

    @ApiProperty({ description: 'The username of the user', example: 'LuisCepeda' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    username: string

    @ApiProperty({ description: 'The email of the user', example: 'luis.cepeda.talentotech@usa.edu.co' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @ApiProperty({ description: 'The settings of the user', example: [1, 2, 3, 4], default: 1 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    userSettingsId: number

    @ApiProperty({ type: Number, description: 'The rol of the user', example: { 1: 'Administrador', 2: 'Moderador de Eventos', 3: 'Moderador de Usuarios', 4: 'Observador', 5: 'Usuario' }, default: 5 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    userRolSettingsId: number
}