import Ajv from "ajv";

export class ResponseUtil {
    static isValidateSchema(response: any, schema: any): boolean {
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const isValid = validate(response);

        return isValid;
    }
}