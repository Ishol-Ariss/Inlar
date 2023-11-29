import { Injectable } from "@nestjs/common";
import { Donation } from "src/Inlar/Entities/Donation";
import { DonationRepository } from "src/Inlar/Application/Repositories/donation-repository";
import { PrismaService } from "../prisma.service";
import { PrismaDonationMapper } from "../mappers/prisma-donation-mapper";

@Injectable()
export class PrismaDonationRepository implements DonationRepository {
    constructor(private prisma: PrismaService) {}

 async createDonation(donation: Donation): Promise<void> {
     const data = PrismaDonationMapper.toPrisma(donation)

     await this.prisma.donation.create({
        data
     })
 }

 async getAllDonationsByUserId(id_user: number): Promise<Donation[] | undefined> {
     const res = await this.prisma.donation.findMany({
        where: {
            ID_USR: id_user
        }
     })

     const data: Donation[] = []

     res?.map(d => {
        data.push(PrismaDonationMapper.toDomain(d))
     })

     return data
 }

 async getDonationById(id: number): Promise<Donation | undefined> {
     const res = await this.prisma.donation.findUnique({
        where: {
            ID_DOA: id
        }
     })

     const data: Donation = PrismaDonationMapper.toDomain(res)

     return data
 }

 async updateDonationById(id: number, donation: Donation): Promise<void> {
     const data = PrismaDonationMapper.toPrisma(donation)

     await this.prisma.donation.update({
        where: {
            ID_DOA: id
        },
        data
     })
 }
}