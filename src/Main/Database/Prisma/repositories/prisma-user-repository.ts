import { Injectable } from "@nestjs/common";
import { User } from "src/Inlar/Types/User";
import { UserRepository } from "src/Inlar/Application/Repositories/user-repository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async getUserById(id: String): Promise<User | null> {
      const id_user = id

      const res = await this.prisma.user.findUnique({
        where: {
            id_user: Number(id_user)
        }
      })

      if(!res) {
        return null
      }

      return PrismaUserMapper.toDomain(res)
  }

  async getUserByEmail(email: string): Promise<User> | null {
    
    const res = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!res) {
      return null
    }

    return PrismaUserMapper.toDomain(res)
  }
}