import { AxiosRequestConfig } from "axios";
import { UrlDetails } from "../resources/customeTypes/urlDetails";
import * as urlDetailsJson from "./../resources/testdata/urlDetails.json";
export class BaseService {
    private baseUrl: string;
    private urlDetails: UrlDetails;
    protected axiosRequestConfig: AxiosRequestConfig;

    constructor() {
        this.urlDetails = urlDetailsJson as UrlDetails;
        this.axiosRequestConfig = {
            baseURL: this.urlDetails.baseUrl,
            timeout: 2000,
        };
        this.baseUrl = this.urlDetails.baseUrl;
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    getUrlDetails(): UrlDetails {
        return this.urlDetails;
    }
}