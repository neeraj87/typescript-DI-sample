export default interface WeatherAPIServiceInterface {
    getCurrentWeather(query: any): Promise<any>;
}