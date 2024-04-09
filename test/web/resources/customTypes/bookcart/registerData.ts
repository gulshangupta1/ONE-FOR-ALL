import { Gender } from "./bookcartEnumns";

export interface RegisterUserData {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    gender: Gender
}