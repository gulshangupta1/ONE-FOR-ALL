import { RandomUtil } from "../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../models/request/auth/signUp.request";
import { CreateProfileRequestBody } from "../models/request/profile/createProfile.request";
import { SignUpResponseBody } from "../models/response/auth/signUp.response";
import { CreateProfileResponseBody } from "../models/response/profile/createProfile.response";
import { UpdateProfileResponseBody } from "../models/response/profile/updateProfile.response";
import { AuthService } from "../services/auth.service";
import { ProfileService } from "../services/profile.service";
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
            first_name: "James",
            last_name: "last_name",
            address: "1st cross, chruch street, London",
            mobile_number: "1234567890"
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
    });

    it("Should be able to update profile", async () => {
        // Update profile
        const updateProfileRequestBody: CreateProfileRequestBody = {
            first_name: "Kane"
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
    });
});