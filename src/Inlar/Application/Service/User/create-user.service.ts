import { Injectable } from "@nestjs/common";
import { User, UserProps } from "src/Inlar/Types/User";
import { UserRepository } from "../../Repositories/user-repository";
import { Either, left, right } from "src/Base/either";
import { UserAlreadyExistsError } from "../../Errors/User/user-already-exists.error";

interface RegisterUserServiceRequest {
    userProps: User | UserProps
}

type RegisterUserServiceResponse = Either<
    UserAlreadyExistsError, 
    {
      null: null
    }
>

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  async execute({
    userProps
  } : RegisterUserServiceRequest) : Promise<RegisterUserServiceResponse> {

    const user = await this.usersRepository.getUserByEmail(userProps.email)

    if(user) {
      return left(new UserAlreadyExistsError)
    }

    await this.usersRepository.createUser(userProps)

    return right(null)
  }
}