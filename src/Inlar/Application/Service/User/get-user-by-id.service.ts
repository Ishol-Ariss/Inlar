import { Injectable } from "@nestjs/common";
import { User } from "src/Inlar/Types/User";
import { UserRepository } from "../../Repositories/user-repository";
import { Either, left, right } from "src/Base/either";
import { UserNotFoundError } from "../../Errors/User/user-not-found.error";

interface RegisterUserServiceRequest {
    id_user: string
}

type RegisterUserServiceResponse = Either<
  UserNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class GetUserByIdService {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  async execute({
    id_user
  } : RegisterUserServiceRequest) : Promise<RegisterUserServiceResponse> {

    const user = await this.usersRepository.getUserById(id_user)

    if(!user) {
      return left(new UserNotFoundError)
    }

    return right({
      user
    })
  }
}