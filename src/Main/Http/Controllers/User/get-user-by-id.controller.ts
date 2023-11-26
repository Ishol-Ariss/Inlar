import {
    Body,
    HttpCode,
    Controller,
    Get,
    HttpException,
    HttpStatus
} from "@nestjs/common"
import { z } from "zod"
import { GetUserByIdService } from "src/Inlar/Application/service/User/get-user-by-id.service"

const user = z.object({
    id_user: z.string()
})

type CreateUserBody = z.infer<typeof user>

@Controller("/user")
export class GetUserByIdController{
    constructor(
        private getUserById: GetUserByIdService,
    ) {}

    @Get()
    @HttpCode(201)
    async handle(@Body() body: CreateUserBody){
        const { id_user } = user.parse(body)

        const result = await this.getUserById.execute({
            id_user
        })

        if(result.isLeft()){
            throw new HttpException(result.value, HttpStatus.BAD_REQUEST)
        }

        return result.value
    }
}