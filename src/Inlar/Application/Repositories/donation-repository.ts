import { Donation, DonationProps } from "src/Inlar/Entities/Donation";

export abstract class DonationRepository {
    abstract createDonation(donation: Donation | DonationProps): Promise<void>
    abstract getAllDonationsByUserId(id_user: number): Promise<Donation[] | undefined>
    abstract getDonationById(id: number): Promise<Donation | undefined>
    abstract updateDonationById(id: number, donation: Donation): Promise<void>
}