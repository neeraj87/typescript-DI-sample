import { inject, injectable } from "inversify";
import TYPES from "../utils/types";

import StudentServiceInterface from "../interfaces/student-service-interface";
import AddressServiceInterface from "../interfaces/address-service-interface";

@injectable()
export class StudentService implements StudentServiceInterface {
    constructor(
        @inject(TYPES.AddressService) public readonly addressService: AddressServiceInterface
    ) {

    }

    /**
     * getStudentProfile
     */
    public async getStudentProfile(id: string): Promise<any> {
        let addresses: any[] = await this.addressService.getStudentAddress(id);
        return {id: "1234", name: "Neeraj Jadhav", addresses};
    }

    /**
     * createStudent
     */
    public async createStudent(student: any): Promise<any> {
        
    }

    /**
     * updateStudent
     */
     public async updateStudent(student: any): Promise<any> {
        
    }

    /**
     * deleteStudent
     */
     public async deleteStudent(id: string): Promise<any> {
        
    }
}