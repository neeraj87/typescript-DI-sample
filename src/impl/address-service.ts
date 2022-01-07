import { inject, injectable } from "inversify";
import TYPES from "../utils/types";

import AddressServiceInterface from "../interfaces/address-service-interface";

@injectable()
export class AddressService implements AddressServiceInterface {
    constructor(
        @inject(TYPES.AddressDbModel) public readonly addressDbModel: any
    ) {
        
    }

    /**
     * getStudentAddress
     */
    public async getStudentAddress(id: number): Promise<any> {
        return await this.addressDbModel.findAll({
            where: {
                studentId: id
            },
            raw: true
        });
    }

    /**
     * createStudentAddress
     */
     public async createStudentAddress(address: any): Promise<any> {
        
    }

    /**
     * updateStudentAddress
     */
     public async updateStudentAddress(address: any): Promise<any> {
        
    }

    /**
     * deleteStudentAddress
     */
     public async deleteStudentAddress(id: number): Promise<any> {
        
    }
}