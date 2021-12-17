import "reflect-metadata";
import 'mocha';
import { expect } from 'chai';
import { Container } from "inversify";

import TYPES from "../src/utils/types";

import { ContainerFactory } from '../src/factories/container-factory';
import WeatherAPIServiceInterface from "../src/interfaces/weather-api-service-interface";
import AxiosServiceInterface from "../src/interfaces/axios-service-interface";

describe("Weather API", function() {
    let container: Container;

    beforeEach(() => {
        container = ContainerFactory.getContainer();
        container.snapshot();
    });

    this.afterEach(() => {
        container.restore();
    });

    it("should return the current weather of given city", async function() {
        let axiosMockService: AxiosServiceInterface = {
            getAsync: async (url: string, options: any) => {
                return {
                    data: {
                        location: {
                            name: "London",
                            region: "City of London, Greater London",
                            country: "United Kingdom",
                            lat: 51.52,
                            lon: -0.11,
                            tz_id: "Europe/London",
                            localtime_epoch: 1639727881,
                            localtime: "2021-12-17 7:58"
                        },
                        current: {
                            last_updated_epoch: 1639727100,
                            last_updated: "2021-12-17 07:45",
                            temp_c: 10,
                            temp_f: 50,
                            is_day: 0,
                            condition: {
                                text: "Overcast",
                                icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
                                code: 1009
                            },
                            wind_mph: 4.3,
                            wind_kph: 6.8,
                            wind_degree: 60,
                            wind_dir: "ENE",
                            pressure_mb: 1040,
                            pressure_in: 30.71,
                            precip_mm: 0,
                            precip_in: 0,
                            humidity: 76,
                            cloud: 100,
                            feelslike_c: 9.4,
                            feelslike_f: 49,
                            vis_km: 10,
                            vis_miles: 6,
                            uv: 1,
                            gust_mph: 6.5,
                            gust_kph: 10.4
                        }
                    }
                };
            },
            postAsync: async (url: string, data: any) => { return true }
        }

        container.unbind(TYPES.AxiosService);
        container.bind<AxiosServiceInterface>(TYPES.AxiosService).toConstantValue(axiosMockService);

        let weatherServiceInstance = container.get<WeatherAPIServiceInterface>(TYPES.WeatherService);
        let response = await weatherServiceInstance.getCurrentWeather("Paris");
        
        let expectedResponse: any = {
            location: {
                name: "London",
                region: "City of London, Greater London",
                country: "United Kingdom",
                lat: 51.52,
                lon: -0.11,
                tz_id: "Europe/London",
                localtime_epoch: 1639727881,
                localtime: "2021-12-17 7:58"
            },
            current: {
                last_updated_epoch: 1639727100,
                last_updated: "2021-12-17 07:45",
                temp_c: 10,
                temp_f: 50,
                is_day: 0,
                condition: {
                    text: "Overcast",
                    icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
                    code: 1009
                },
                wind_mph: 4.3,
                wind_kph: 6.8,
                wind_degree: 60,
                wind_dir: "ENE",
                pressure_mb: 1040,
                pressure_in: 30.71,
                precip_mm: 0,
                precip_in: 0,
                humidity: 76,
                cloud: 100,
                feelslike_c: 9.4,
                feelslike_f: 49,
                vis_km: 10,
                vis_miles: 6,
                uv: 1,
                gust_mph: 6.5,
                gust_kph: 10.4
            }
        };
        expect(response).to.deep.equal(expectedResponse);
    });

    it("should throw an error if unable to fetch the current weather of given city", async function() {
        let axiosMockService: AxiosServiceInterface = {
            getAsync: async (url: string, options: any) => {
                throw new Error("Weather not found");
            },
            postAsync: async (url: string, data: any) => { return true }
        }

        container.unbind(TYPES.AxiosService);
        container.bind<AxiosServiceInterface>(TYPES.AxiosService).toConstantValue(axiosMockService);

        let weatherServiceInstance = container.get<WeatherAPIServiceInterface>(TYPES.WeatherService);
        let response = await weatherServiceInstance.getCurrentWeather("Paris");
        
        expect(response).to.equal(null);
    });
});