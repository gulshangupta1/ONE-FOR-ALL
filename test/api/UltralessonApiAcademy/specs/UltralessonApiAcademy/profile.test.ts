import { ResponseUtil } from "../../../../../utils/api/responseUtil";
import { RandomUtil } from "../../../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../../models/request/UltralessonApiAcademy/auth/signUp.request";
import { CreateProfileRequestBody } from "../../models/request/UltralessonApiAcademy/profile/createProfile.request";
import { SignUpResponseBody } from "../../models/response/UltralessonApiAcademy/auth/signUp.response";
import { CreateProfileResponseBody, createProfileResponseSchema } from "../../models/response/UltralessonApiAcademy/profile/createProfile.response";
import { UpdateProfileResponseBody, updateProfileResponseSchema } from "../../models/response/UltralessonApiAcademy/profile/updateProfile.response";
import { AuthService } from "../../services/UltralessonApiAcademy/auth.service";
import { ProfileService } from "../../services/UltralessonApiAcademy/profile.service";
import { expect } from "chai";

let profileService: ProfileService;
let authService: AuthService;

let accessToken: string;
let signUpResponseBody: SignUpResponseBody
let createProfileRequestBody: CreateProfileRequestBody;
let createProfileResponseBody: CreateProfileResponseBody;

const specName: string = "Profile tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        profileService = new ProfileService();
    });

    beforeEach(async () => {
        // Sign-Up
        const signUpRequestBody: SignUpRequestBody = {
            email: RandomUtil.getRandomGmail().toLowerCase(),
            password: RandomUtil.getRandomPassword(6)
        };
        signUpResponseBody = await authService.signUp(signUpRequestBody);
        accessToken = signUpResponseBody.data.session.access_token;

        // Create profile
        createProfileRequestBody = {
            first_name: RandomUtil.getRandomFirstName(),
            last_name: RandomUtil.getRandomLastName(),
            address: RandomUtil.getRandomAddress(),
            mobile_number: RandomUtil.getRandomMobileNumber()
        };
        createProfileResponseBody = await profileService.createProfile(accessToken, createProfileRequestBody);
    });

    it("Should be able to create profile", async () => {
        expect(createProfileResponseBody.status).to.be.eq(201);
        expect(createProfileResponseBody.statusText).to.be.eq("Created");
        expect(createProfileResponseBody.id).be.not.be.undefined;
        expect(createProfileResponseBody.created_at).to.not.be.undefined;
        expect(createProfileResponseBody.first_name).to.be.eq(createProfileRequestBody.first_name);
        expect(createProfileResponseBody.last_name).to.be.eq(createProfileRequestBody.last_name);
        expect(createProfileResponseBody.address).to.be.eq(createProfileRequestBody.address);
        expect(createProfileResponseBody.mobile_number).to.be.eq(createProfileRequestBody.mobile_number);
        expect(createProfileResponseBody.user_id).to.be.eq(signUpResponseBody.data.user.id);
        expect(ResponseUtil.isValidateSchema(createProfileResponseBody, createProfileResponseSchema), "Invalid schema").to.be.true;
    });

    it("Should be able to update profile", async () => {
        // Update profile
        const updateProfileRequestBody: CreateProfileRequestBody = {
            first_name: RandomUtil.getRandomFirstName()
        };
        const fieldsUpdated: string[] = ["first_name"];

        const updateProfileResponseBody: UpdateProfileResponseBody = await profileService.updateProfile(accessToken, updateProfileRequestBody);

        expect(updateProfileResponseBody.status).to.be.equal(200);
        expect(updateProfileResponseBody.statusText).to.be.equal("OK");
        expect(updateProfileResponseBody.data.id).to.be.equal(createProfileResponseBody.id);
        expect(updateProfileResponseBody.data.created_at).to.not.be.undefined;
        expect(updateProfileResponseBody.data.first_name).to.be.equal(updateProfileRequestBody.first_name);
        expect(updateProfileResponseBody.data.address).to.be.equal(createProfileResponseBody.address);
        expect(updateProfileResponseBody.data.mobile_number).to.be.equal(createProfileResponseBody.mobile_number);
        expect(updateProfileResponseBody.data.user_id).to.be.equal(signUpResponseBody.data.user.id);
        expect(updateProfileResponseBody.message).to.be.equal("Profile updated successfully");
        expect(updateProfileResponseBody.field_updated.toString()).to.be.equal(fieldsUpdated.toString());
        expect(ResponseUtil.isValidateSchema(updateProfileResponseBody, updateProfileResponseSchema), "Invalid schema").to.be.true;
    });
});