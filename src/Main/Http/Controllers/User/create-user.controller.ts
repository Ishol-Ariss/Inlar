import {
    Body,
    Post,
    HttpCode,
    Controller
} from "@nestjs/common"
import { z } from "zod"
import { CreateUserService } from "src/Inlar/Application/service/User/create-user.service"
import { HttpStatus, HttpException } from "@nestjs/common"
import { Res, Response } from "@nestjs/common/decorators/http"
import { UserAlreadyExistsError } from "src/Inlar/Application/Errors/User/user-already-exists.error"

const createUserBody = z.object({
    name: z.string(),
    address: z.string(),
    email: z.string(),
    password: z.string(),
    cellPhone: z.string(),
    cpf: z.string()
})

type CreateUserBody = z.infer<typeof createUserBody>

@Controller("/user")
export class CreateUserController{
    constructor(
        private registerUserService: CreateUserService,
    ) {}

    @Post()
    @HttpCode(201)
    async handle(@Body() body: CreateUserBody, @Response() response: Response){
        const { name, address, email, password, cellPhone, cpf } = createUserBody.parse(body)

        const result = await this.registerUserService.execute({userProps: {
            name,
            address,
            cpf,
            password,
            cellPhone,
            email
        }})

        if(result.isLeft){
            response.json()
        }
    }
}