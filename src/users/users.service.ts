import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'
import { formatUserData, formatUsersData } from '../utils/users.js'
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }



  async createUser(userData: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(userData.password, 15)
    const newUserData = { ...userData, password: hashedPassword }
    const newUser = await this.prisma.user.create({ data: newUserData })
    return formatUserData(newUser)
  }


  async getAllUsers() {
    const usersData = await this.prisma.user.findMany();

    return formatUsersData(usersData)
  }

  async getAllMatchingUsers(query: { limit: string, rol: string }) {
    const { limit, rol } = query
    let cond = {}
    if (limit) cond = { ...cond, take: parseInt(limit) }
    if (rol) cond = { ...cond, where: { 'userRolSettingsId': parseInt(rol) } }

    const usersData = await this.prisma.user.findMany(cond)
    return formatUsersData(usersData)
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
    return formatUserData(userFound)
  }

  async getUserByEmail(email: string) {
    const userFound = this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (!userFound) {
      return new NotFoundException(`User with email ${email} not found.`)
    }
    return formatUserData(userFound)
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


