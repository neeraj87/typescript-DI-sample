import axios from 'axios';
import { inject, injectable } from "inversify";
import AxiosServiceInterface from "../interfaces/axios-service-interface";

@injectable()
export default class AxiosService implements AxiosServiceInterface {

    /**
     * getAsync
     */
    public async getAsync(url: string, options: any) {
        return await axios.get(url, options);
    }

    /**
     * postAsync
     */
    public async postAsync(url: string, data: any) {
        return await axios.post(url, data);
    }
}