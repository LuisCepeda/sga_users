import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(userData: CreateUserDto) {
    //TODO encode password
    return await this.prisma.user.create({ data: userData })
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getAllMatchingUsers(query: { limit: string, rol: string }) {
    const { limit, rol } = query
    let cond = {}
    if (limit) cond = { ...cond, take: parseInt(limit) }
    if (rol) cond = { ...cond, where: { 'userRolSettingsId': parseInt(rol) } }

    return await this.prisma.user.findMany(cond)
  }

  async getUserById(id: string) {
    const userFound = this.prisma.user.findFirst({
      where: {
        id: id
      }
    })
    if (!userFound) {
      return new NotFoundException(`User with id ${id} not found.`)
    }
    return userFound
  }

  async updateUserById(userId: string, updateUserData: any) {
    const userUpdated = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        ...updateUserData,
        updateAt: new Date
      }
    })
    return userUpdated
  }

  async removeUserById(userId: string) {
    const userRemoved = await this.prisma.user.delete({
      where: {
        id: userId
      }
    })
    return userRemoved
  }
}
