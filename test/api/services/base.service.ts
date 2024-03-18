import Ajv from "ajv";
import { AxiosResponse } from "axios";
import { expect } from "chai";

export class BaseService {
    ajv: Ajv;

    constructor() {
        this.ajv = new Ajv();
    }

    private baseUrl: string = "https://www.apicademy.dev";

    getBaseUrl(): string {
        return this.baseUrl;
    }

    protected validateSchema(response: AxiosResponse<any, any>, schema: any): void {
        const validate = this.ajv.compile(schema);
        const isValid = validate(response.data);
        expect(isValid, "Invalid schema").to.be.true;
    }
}