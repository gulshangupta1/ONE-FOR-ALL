export class BaseService {

    private baseUrl: string = "https://www.apicademy.dev";

    getBaseUrl(): string {
        return this.baseUrl;
    }
}