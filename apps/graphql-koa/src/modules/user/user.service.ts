// import { prisma } from '@xyz/mylib/prisma';
import { PrismaClient } from '@prisma/client';
import { CreateUserInput, LoginInput } from './user.dto';
import { ApolloError } from 'apollo-server-koa';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Context from '../../type/context';

// import { prisma } from '@xyz/mylib/prisma';
class UserService {

    
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient();
  }
  //****************create user*************//
  async createuser(input: CreateUserInput) {
    const existingUser = await this.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (existingUser) {
        throw new ApolloError(' email exist');
      }
    return await this.prisma.user.create({ data: input });
  }

  //****************login user*************//

  async login(input: LoginInput, context: Context) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!existingUser) {
      throw new ApolloError('invalid email or password');
    }

    const validPassword = await bcrypt.compare(
      input.password,
      existingUser.password
    );
    if (!validPassword) {
      throw new ApolloError('invalid email or password');
    }

    const token = jwt.sign({ userId: existingUser.id }, 'very-secret');
    context.ctx.cookies.set('accessToken', token);

    console.log(context.ctx.cookies.get('accessToken'));
    return token;
  }
}
export default UserService;
