import { Prisma, Donation as PrismaDonation } from '@prisma/client'
import { Donation } from 'src/Inlar/Entities/Donation'


export class PrismaDonationMapper {
  static toDomain(raw: PrismaDonation): Donation {
    return Donation.create(
      {
        description: raw.DESC,
        quantity: raw.QUAN,
        id_user: raw.ID_USR,
        createdAt: raw.CRE_AT
      },
    )
  }

  static toPrisma(donation: Donation): Prisma.DonationUncheckedCreateInput {
    return {
        DESC: donation.description ?? "",
        QUAN: donation.quantity ?? 0,
        ID_USR: donation.id_user ?? 0,
        CRE_AT: donation.createdAt
    }
  }
}