import 'reflect-metadata';
import { Container } from "inversify";

//import service identifiers
import TYPES from "../utils/types";

//import service interfaces
import StudentServiceInterface from "../interfaces/student-service-interface";
import AddressServiceInterface from "../interfaces/address-service-interface";
import WeatherAPIServiceInterface from "../interfaces/weather-api-service-interface";
import AxiosServiceInterface from "../interfaces/axios-service-interface";

//import service implementations
import { StudentService } from "../impl/student-service";
import { AddressService } from "../impl/address-service";
import { WeatherAPIService } from "../impl/weather-api-service";
import AxiosService from "../services/axios-service";

//import db models
import { Student } from "../db-models/Student";
import { Address } from "../db-models/Address";

export class ContainerFactory {

    public static getContainer(): Container {
        let container = new Container({ skipBaseClassChecks: true });
        ContainerFactory.configureServices(container);
        return container;
    }

    private static configureServices(container: Container) {
        container.bind<StudentServiceInterface>(TYPES.StudentService).to(StudentService);
        container.bind<AddressServiceInterface>(TYPES.AddressService).to(AddressService);
        container.bind<WeatherAPIServiceInterface>(TYPES.WeatherService).to(WeatherAPIService);

        container.bind<AxiosServiceInterface>(TYPES.AxiosService).to(AxiosService);
        container.bind(TYPES.StudentDbModel).toConstantValue(Student);
        container.bind(TYPES.AddressDbModel).toConstantValue(Address);
    }
}