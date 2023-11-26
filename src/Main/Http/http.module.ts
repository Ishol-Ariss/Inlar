import { Module } from '@nestjs/common'
import { DatabaseModule } from '../Database/database.module'
import { CreateUserController } from './Controllers/User/create-user.controller'
import { CreateUserService } from '../../Inlar/Application/service/User/create-user.service'
import { GetUserByIdController } from './Controllers/User/get-user-by-id.controller'
import { GetUserByIdService } from '../../Inlar/Application/service/User/get-user-by-id.service'

@Module({
    imports:[
        DatabaseModule
    ],
    controllers:[
        CreateUserController,
        GetUserByIdController
    ],
    providers: [
        CreateUserService,
        GetUserByIdService
    ]
})

export class HttpModule {}