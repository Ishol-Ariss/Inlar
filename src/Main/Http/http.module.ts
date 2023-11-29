import { Module } from '@nestjs/common'
import { DatabaseModule } from '../Database/database.module'
import { CreateUserController } from './Controllers/User/create-user.controller'
import { CreateUserUseCase } from 'src/Inlar/Application/UseCases/User/create-user.usecase'
import { GetUserByIdController } from './Controllers/User/get-user-by-id.controller'
import { GetUserByIdUseCase } from 'src/Inlar/Application/UseCases/User/get-user-by-id.usecase'
import { LoginUserController } from './Controllers/User/login-user.controller'
import { LoginUserUseCase } from 'src/Inlar/Application/UseCases/User/login-user.usecase'
import { CreateDonationController } from './Controllers/Donation/create-donation.controller'
import { CreateDonationUseCase } from 'src/Inlar/Application/UseCases/Donation/create-donation.usecase'
import { GetAllDonationsByUserIdController } from './Controllers/Donation/get-all-donation-by-user-id.controller'
import { GetAllDonationsByUserIdUseCase } from 'src/Inlar/Application/UseCases/Donation/get-all-donations-by-user-id.usecase'

@Module({
    imports:[
        DatabaseModule
    ],
    controllers:[
        CreateUserController,
        GetUserByIdController,
        LoginUserController,
        CreateDonationController,
        GetAllDonationsByUserIdController
    ],
    providers: [
        CreateUserUseCase,
        GetUserByIdUseCase,
        LoginUserUseCase,
        CreateDonationUseCase,
        GetAllDonationsByUserIdUseCase
    ]
})

export class HttpModule {}