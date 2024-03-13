import { faker } from "@faker-js/faker"

export class RandomUtil {
    static getRandomGmail(): string {
        return faker.internet.email({ provider: "gmail" });
    }

    static getRandomPassword(length?: number): string {
        return faker.internet.password({ length: length });
    }
}