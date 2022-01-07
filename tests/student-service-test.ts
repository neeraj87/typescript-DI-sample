import "reflect-metadata";
import 'mocha';
import { expect } from 'chai';
import { Container } from "inversify";

import TYPES from "../src/utils/types";
import mockStudentDbModel from "./db-mocks/student-db-mock";
import { ContainerFactory } from '../src/factories/container-factory';
import StudentServiceInterface from "../src/interfaces/student-service-interface";
import AddressServiceInterface from "../src/interfaces/address-service-interface";

describe("Student Service", function() {
    //add mock address service 
    let addressServiceMock = {
        getStudentAddress: async (id: number) => {
            return [
                {
                    id: 23,
                    street: "126",
                    city: "San Jone",
                    state: "CA",
                    zip_postal_code: "394221",
                    studentId: 1
                }
            ]
        },
        createStudentAddress: async (address: any) => {return true},
        updateStudentAddress: async (address: any) => {return true},
        deleteStudentAddress: async (id: number) => {return true},
    }

    let container: Container;

    beforeEach(() => {
        container = ContainerFactory.getContainer();
        container.snapshot();
    });

    this.afterEach(() => {
        container.restore();
    });

    it("should return the student profile record", async function() {
        //unbind address service and bind mock address service
        container.unbind(TYPES.AddressService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).toConstantValue(addressServiceMock);

        //unbind student db model and bind mock student db model
        container.unbind(TYPES.StudentDbModel);
        container.bind(TYPES.StudentDbModel).toConstantValue(mockStudentDbModel);

        let studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
        let expectedResponse: any = {
            student: {
                id: 1,
                first_name: "Neeraj",
                last_name: "Jadhav",
                dateOfBirth: "1987-08-28"
            },
            addresses: [
                {
                    id: 23,
                    street: "126",
                    city: "San Jone",
                    state: "CA",
                    zip_postal_code: "394221",
                    studentId: 1
                }
            ]
        };

        let incomingResult = await studentService.getStudentProfile(1);
        expect(incomingResult).to.deep.equal(expectedResponse);
    });

    it("should throw an error if student record is not found", async function() {
        //unbind address service and bind mock address service
        container.unbind(TYPES.AddressService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).toConstantValue(addressServiceMock);

        let mockStudentDbModelToThrowException = {
            findByPk: (pk: any) => {
                throw new Error("Student not found");
            }
        };

        //unbind student db model and bind mock student db model
        container.unbind(TYPES.StudentDbModel);
        container.bind(TYPES.StudentDbModel).toConstantValue(mockStudentDbModelToThrowException);

        let studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
        let incomingResult = await studentService.getStudentProfile(1);
        expect(incomingResult).to.equal(null);
    });

    it("should create a new student", async function() {
        //unbind address service and bind mock address service
        container.unbind(TYPES.AddressService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).toConstantValue(addressServiceMock);

        //unbind student db model and bind mock student db model
        container.unbind(TYPES.StudentDbModel);
        container.bind(TYPES.StudentDbModel).toConstantValue(mockStudentDbModel);

        let studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
        let mockResponse: any = {
            id: 1,
            first_name: "Neeraj",
            last_name: "Jadhav",
            dateOfBirth: "1987-08-28"
        };

        let incomingResult = await studentService.createStudent({first_name: "Neeraj", last_name: "Jadhav", dateOfBirth: "1987-08-28"});
        expect(incomingResult).to.deep.equal(mockResponse);
    });

    it("should update a student", async function() {
        //unbind address service and bind mock address service
        container.unbind(TYPES.AddressService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).toConstantValue(addressServiceMock);

        //unbind student db model and bind mock student db model
        container.unbind(TYPES.StudentDbModel);
        container.bind(TYPES.StudentDbModel).toConstantValue(mockStudentDbModel);

        let studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
        
        let incomingResult = await studentService.updateStudent(1, {first_name: "Neeraj", last_name: "Jadhav", dateOfBirth: "1987-08-28"});
        expect(incomingResult).to.equal(1);
    });

    it("should delete a student", async function() {
        //unbind address service and bind mock address service
        container.unbind(TYPES.AddressService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).toConstantValue(addressServiceMock);

        //unbind student db model and bind mock student db model
        container.unbind(TYPES.StudentDbModel);
        container.bind(TYPES.StudentDbModel).toConstantValue(mockStudentDbModel);

        let studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
        
        let incomingResult = await studentService.deleteStudent(1);
        expect(incomingResult).to.equal(1);
    });
});