import { faker } from "@faker-js/faker"

export class RandomUtil {
    static getRandomGmail(): string {
        return faker.internet.email({ provider: "gmail" });
    }

    static getRandomPassword(length?: number, pattern?: RegExp): string {
        return faker.internet.password({ length: length, pattern: pattern });
    }

    static getRandomFirstName(): string {
        return faker.person.firstName();
    }

    static getRandomLastName(): string {
        return faker.person.lastName();
    }

    static getRandomAddress(): string {
        return faker.location.streetAddress();
    }

    static getRandomMobileNumber(): string {
        return faker.phone.number().replaceAll(/\D/g, "").slice(-10);
    }

    static getRandomUserName(): string {
        return faker.internet.userName();
    }
}