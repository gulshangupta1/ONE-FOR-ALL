import { LOGGER } from "../../../../../utils/reporting/LoggerHelper";
import { MakePaymentResponseBody } from "../../models/response/UltralessonApiAcademy/payment/makePayment.response";
import { BaseService } from "./base.service";
import axios from "axios";

export class PaymentService extends BaseService {
    async makePayment(accessToken: string): Promise<MakePaymentResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().payments.makePayment}`;
        const token: string = `Bearer ${accessToken}`;

        try {
            const response = await axios.post(url, {}, {
                headers: { "Authorization": token }
            });

            const makePaymentResponseBody: MakePaymentResponseBody = response.data as MakePaymentResponseBody;
            makePaymentResponseBody.status = response.status;
            makePaymentResponseBody.statusText = response.statusText;

            return makePaymentResponseBody;
        } catch (err) {
            LOGGER.error(`Error while making payment.\n${err.stack}`);
            throw err;
        }
    }
}