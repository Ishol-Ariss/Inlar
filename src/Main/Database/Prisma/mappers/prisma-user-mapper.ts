import { Prisma, User as PrismaUser } from '@prisma/client'
import { User } from 'src/Inlar/Types/User'


export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name ?? '',
        email: raw.email ?? '',
        password: raw.email ?? '',
        cellPhone: raw.cellPhone ?? '',
        address: raw.address ?? '',
        cpf: raw.cpf ?? "",
      },
    )
  }

  static toPrisma(user: User): Prisma.UserCreateInput {
    return {
        name: user.name ?? '',
        email: user.email ?? '',
        password: user.password ?? '',
        cellPhone: user.cellPhone ?? '',
        address: user.address ?? '',
        cpf: user.cpf ?? "",
    }
  }
}