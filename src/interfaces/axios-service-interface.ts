export default interface AxiosServiceInterface {
    getAsync(url: string, options: any): Promise<any>;
    postAsync(url: string, data: any): Promise<any>;
}