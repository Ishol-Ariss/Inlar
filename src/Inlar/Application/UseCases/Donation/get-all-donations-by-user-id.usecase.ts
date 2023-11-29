import { Injectable } from "@nestjs/common";
import { Donation } from "src/Inlar/Entities/Donation";
import { DonationRepository } from "../../Repositories/donation-repository";
import { Either, left, right } from "src/Base/either";
import { UserRepository } from "../../Repositories/user-repository";
import { UserNotFoundError } from "../../Errors/User/user-not-found.error";

interface getAllDonationsByUserIdnUseCaseRequest {
    id_user: number
}

type getAllDonationsByUserIdnUseCaseResponse = Either<
    UserNotFoundError | null, 
    {
        donations: Donation[]
    }
>

@Injectable()
export class GetAllDonationsByUserIdUseCase {
  constructor(
    private donationRepository: DonationRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    id_user
  } : getAllDonationsByUserIdnUseCaseRequest) : Promise<getAllDonationsByUserIdnUseCaseResponse> {

    const user = await this.userRepository.getUserById(id_user)

    if(!user) {
        return left(new UserNotFoundError)
    }

    const donations: Donation[] = await this.donationRepository.getAllDonationsByUserId(id_user)

    return right({
        donations
    })
  }
}