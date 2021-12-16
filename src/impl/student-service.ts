import { inject, injectable } from "inversify";
import TYPES from "../utils/types";

import StudentServiceInterface from "../interfaces/student-service-interface";
import AddressServiceInterface from "../interfaces/address-service-interface";

//import { Student } from "../db-models/Student";

@injectable()
export class StudentService implements StudentServiceInterface {
    constructor(
        @inject(TYPES.AddressService) public readonly addressService: AddressServiceInterface,
        @inject(TYPES.StudentDbModel) public readonly studentDbModel: any
    ) {

    }

    /**
     * getStudentProfile
     */
    public async getStudentProfile(id: number): Promise<any> {
        try {
            let addresses: any[] = await this.addressService.getStudentAddress(id);
            let student: any = await this.studentDbModel.findByPk(id, {raw: true});
            return {student, addresses};
        } catch (error) {
            console.log(`Error getting student info: ${error}`);
            return null;
        }
    }

    /**
     * createStudent
     */
    public async createStudent(student: any): Promise<any> {
        return await this.studentDbModel.create(student);
    }

    /**
     * updateStudent
     */
    public async updateStudent(id: number, student: any): Promise<any> {
        return await this.studentDbModel.update(student, {
            where: {id: id}
        });
    }

    /**
     * deleteStudent
     */
    public async deleteStudent(id: number): Promise<any> {
        return await this.studentDbModel.destroy({
            where: {id: id}
        });
    }
}