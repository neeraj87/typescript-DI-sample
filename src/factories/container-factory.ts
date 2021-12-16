import 'reflect-metadata';
import { Container } from "inversify";

//import service identifiers
import TYPES from "../utils/types";

//import service interfaces
import StudentServiceInterface from "../interfaces/student-service-interface";
import AddressServiceInterface from "../interfaces/address-service-interface";

//import service implementations
import { StudentService } from "../impl/student-service";
import { AddressService } from "../impl/address-service";

import { Student } from "../db-models/Student";

export class ContainerFactory {

    public static getContainer(): Container {
        //TODO: what is skipBaseClassChecks?
        let container = new Container({ skipBaseClassChecks: true });
        ContainerFactory.configureServices(container);
        return container;
    }

    private static configureServices(container: Container) {

        container.bind<StudentServiceInterface>(TYPES.StudentService).to(StudentService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).to(AddressService);
        container.bind(TYPES.StudentDbModel).toConstantValue(Student);
    }
}