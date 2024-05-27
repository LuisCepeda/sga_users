import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  async getAllUsers(@Query() query: any) {
    if (Object.keys(query).length > 0) {
      return { 'Status': 'ok', 'Data': await this.usersService.getAllMatchingUsers(query), 'Query': query }
    }
    return { 'Status': 'ok', 'Data': await this.usersService.getAllUsers() }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return {
      'Status': 'ok', 'Data': await this.usersService.getUserById(id)
    }
  }


  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.createUser(userData);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.usersService.updateUserById(id, userData);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUserById(id);
  }
}
