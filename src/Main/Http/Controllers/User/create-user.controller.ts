import {
    Body,
    Post,
    HttpCode,
    Controller,
    HttpException,
    HttpStatus,
} from "@nestjs/common"
import { z } from "zod"
import { CreateUserService } from "src/Inlar/Application/service/User/create-user.service"

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
        private createUserService: CreateUserService,
    ) {}

    @Post()
    @HttpCode(201)
    async handle(@Body() body: CreateUserBody){
        const { name, address, email, password, cellPhone, cpf } = createUserBody.parse(body)

        const result = await this.createUserService.execute({userProps: {
            name,
            address,
            cpf,
            password,
            cellPhone,
            email
        }})

        if(result.isLeft()){
            throw new HttpException(result.value, HttpStatus.BAD_REQUEST)
        }
    }
}