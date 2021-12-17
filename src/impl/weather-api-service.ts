import { inject, injectable } from "inversify";

import TYPES from "../utils/types";
import WeatherAPIServiceInterface from "../interfaces/weather-api-service-interface";
import AxiosServiceInterface from "../interfaces/axios-service-interface";

@injectable()
export class WeatherAPIService implements WeatherAPIServiceInterface {
    constructor(
        @inject(TYPES.AxiosService) public readonly axiosService: AxiosServiceInterface,
    ) {}

    /**
     * getCurrentWeather
     */
    public async getCurrentWeather(query: any) {
        try {
            let result = await this.axiosService.getAsync("http://api.weatherapi.com/v1/current.json", {
                params: {
                    key: process.env.WEATHER_API_KEY,
                    q: query
                }
            });
            return result.data;
        } catch (error) {
            console.log(`Error getting weather info: ${error}`);
            return null;
        }
    }
}