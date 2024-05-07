import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail, MinLength, IsNumber, Min, Max, isEmail, IsOptional } from "class-validator"

export class UpdateUserDto {
    @ApiProperty({ description: 'The firstname of the user', example: 'Luis', required: false })
    @IsOptional()
    @IsString()
    readonly firstname?: string

    @ApiProperty({ description: 'The last name of the user', example: 'Cepeda', required: false })
    @IsOptional()
    @IsString()
    readonly lastname?: string

    @ApiProperty({ description: 'The username of the user', example: 'LuisCepeda', required: false })
    @IsOptional()
    @IsString()
    readonly username?: string

    @ApiProperty({ description: 'The email of the user', example: 'luis.cepeda.talentotech@usa.edu.co', required: false })
    @IsOptional()
    @IsString()
    readonly email?: string

    @ApiProperty({ description: 'The password of the user', required: false })
    @IsOptional()
    @IsEmail()
    readonly password?: string

    @ApiProperty({ description: 'The settings of the user', example: [1, 2, 3, 4], default: 1, required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    readonly userSettingsId?: number

    @ApiProperty({ type: Number, description: 'The rol of the user', example: { 1: 'Administrador', 2: 'Moderador de Eventos', 3: 'Moderador de Usuarios', 4: 'Observador', 5: 'Usuario' }, default: 5, required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    readonly userRolSettingsId?: number
}