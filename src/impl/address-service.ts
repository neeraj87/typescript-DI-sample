import { injectable } from "inversify";
import AddressServiceInterface from "../interfaces/address-service-interface";

@injectable()
export class AddressService implements AddressServiceInterface {
    constructor() {
        
    }

    /**
     * getStudentAddress
     */
    public async getStudentAddress(id: string): Promise<any> {
        return await [
            {
                "streetAddress": "126",
                "city": "San Jone",
                "state": "CA",
                "postalCode": "394221"
            },
            {
                "streetAddress": "126",
                "city": "San Jone",
                "state": "CA",
                "postalCode": "394221"
            },
            {
                "streetAddress": "126",
                "city": "San Jone",
                "state": "CA",
                "postalCode": "394221"
            }
        ]
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
     public async deleteStudentAddress(id: string): Promise<any> {
        
    }
}