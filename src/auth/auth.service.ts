import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare } from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  async register(userObject: RegisterAuthDto) {
    return 'This action adds a new auth';
  }


  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject
    try {
      const userFound = await this.prisma.user.findFirst({
        where: {
          email: email
        }
      })

      const isUserRegistered = userFound !== null

      if (!isUserRegistered) return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)

      const checkPassword = await compare(password, userFound.password)
      if (!checkPassword) return new HttpException('INCORRECT_PASSWORD', HttpStatus.BAD_REQUEST)

      return userFound
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

}
