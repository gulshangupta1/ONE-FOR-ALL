import axios from "axios";
import { CreateProfileRequestBody } from "../models/request/profile/createProfile.request";
import { CreateProfileResponseBody } from "../models/response/profile/createProfile.response";
import { BaseService } from "./base.service";
import { LOGGER } from "../../../utils/reporting/LoggerHelper";
import { UpdateProfileResponseBody } from "../models/response/profile/updateProfile.response";

export class ProfileService extends BaseService {
    async createProfile(accessToken: string, body: CreateProfileRequestBody): Promise<CreateProfileResponseBody> {
        const url: string = `${this.getBaseUrl()}/api/profile`;
        const token: string = `Bearer ${accessToken}`;

        try {
            const response = await axios.post(url, body, {
                headers: { "Authorization": token }
            });

            const createProfileResponseBody: CreateProfileResponseBody = response.data as CreateProfileResponseBody;
            createProfileResponseBody.status = response.status;
            createProfileResponseBody.statusText = response.statusText;

            return createProfileResponseBody;
        } catch (err) {
            LOGGER.error(`Error while creating a profile.\n${err.stack}`);
            throw err;
        }
    }

    async updateProfile(accessToken: string, body: CreateProfileRequestBody): Promise<UpdateProfileResponseBody> {
        const url: string = `${this.getBaseUrl()}/api/profile`;
        const token: string = `Bearer ${accessToken}`;

        try {
            const response = await axios.patch(url, body, {
                headers: { "Authorization": token }
            });

            const updateProfileResponseBody: UpdateProfileResponseBody = response.data as UpdateProfileResponseBody;
            updateProfileResponseBody.status = response.status;
            updateProfileResponseBody.statusText = response.statusText;

            return updateProfileResponseBody;
        } catch (err) {
            LOGGER.error(`Error while updating profile.\n${err.stack}`);
        }
    }
}