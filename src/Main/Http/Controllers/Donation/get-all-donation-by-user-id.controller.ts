import {
    Body,
    HttpCode,
    Controller,
    HttpException,
    HttpStatus,
    Get,
} from "@nestjs/common"
import { z } from "zod"
import { GetAllDonationsByUserIdUseCase } from "src/Inlar/Application/UseCases/Donation/get-all-donations-by-user-id.usecase"

const getAllDonationsByUserIdBody = z.object({
    id_user: z.number()
})

type GetAllDonationsByUserIdBody = z.infer<typeof getAllDonationsByUserIdBody>

@Controller("/donation")
export class GetAllDonationsByUserIdController{
    constructor(
        private getAllDonationsByUserIdUseCase: GetAllDonationsByUserIdUseCase,
    ) {}

    @Get()
    @HttpCode(201)
    async handle(@Body() body: GetAllDonationsByUserIdBody){
        const { id_user } = getAllDonationsByUserIdBody.parse(body)

        const result = await this.getAllDonationsByUserIdUseCase.execute({
            id_user
        })

        if(result.isLeft()){
            throw new HttpException(result.value, HttpStatus.BAD_REQUEST)
        }

        return result.value
    }
}