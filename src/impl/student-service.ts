import { inject, injectable } from "inversify";
import TYPES from "../utils/types";

import StudentServiceInterface from "../interfaces/student-service-interface";
import AddressServiceInterface from "../interfaces/address-service-interface";

import { Student } from "../db-models/Student";

@injectable()
export class StudentService implements StudentServiceInterface {
    constructor(
        @inject(TYPES.AddressService) public readonly addressService: AddressServiceInterface
    ) {

    }

    /**
     * getStudentProfile
     */
    public async getStudentProfile(id: number): Promise<any> {
        let addresses: any[] = await this.addressService.getStudentAddress(id);
        let student: any = await Student.findByPk(id, {raw: true});
        
        console.log('this line is covered');
        return {student, addresses};
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
    public async deleteStudent(id: number): Promise<any> {
        
    }
}