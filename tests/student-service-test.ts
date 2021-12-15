import "reflect-metadata";
import 'mocha';
import { expect } from 'chai';
import { Container } from "inversify";

import TYPES from "../src/utils/types";
import { ContainerFactory } from '../src/factories/container-factory';
import StudentServiceInterface from "../src/interfaces/student-service-interface";

describe("Student Service", function() {
    let studentService;
    let container: Container;

    beforeEach(() => {
        container = ContainerFactory.getContainer();
        container.snapshot();
        //studentService = container.get<StudentServiceInterface>(TYPES.StudentService)
    });

    this.afterEach(() => {
        container.restore();
    })

    it("should return the student profile record", async function() {

        //let response = 
        let getStudentProfileMock = {
            getStudentProfile: async (id: number) => {
                return {
                    status: "success",
                    message: "Welcome to API Service",
                    student: {
                        student: {
                            id: 1,
                            first_name: "Neeraj",
                            last_name: "Jadhav",
                            dateOfBirth: "1987-08-28"
                        },
                        addresses: [
                            {
                                streetAddress: "126",
                                city: "San Jone",
                                state: "CA",
                                postalCode: "394221"
                            }
                        ]
                    }
                };
            },
            createStudent: async (student: any) => {return true},
            updateStudent: async (student: any) => {return true},
            deleteStudent: async (id: number) => {return true}
        }

        container.unbind(TYPES.StudentService);
        container.bind<StudentServiceInterface>(TYPES.StudentService).toConstantValue(getStudentProfileMock);

        let result = container.get<StudentServiceInterface>(TYPES.StudentService);
        let mockResponse: any = {
            status: "success",
            message: "Welcome to API Service",
            student: {
                student: {
                    id: 1,
                    first_name: "Neeraj",
                    last_name: "Jadhav",
                    dateOfBirth: "1987-08-28"
                },
                addresses: [
                    {
                        streetAddress: "126",
                        city: "San Jone",
                        state: "CA",
                        postalCode: "394221"
                    }
                ]
            }
        };

        let incomingResult = await result.getStudentProfile(1);
        expect(incomingResult).to.deep.equal(mockResponse);
    });
});