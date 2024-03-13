import { faker } from "@faker-js/faker"

export class RandomUtil {
    getRandomGmail(): string {
        return faker.internet.email({ provider: "gmail" });
    }

    getRandomPassword(length?: number): string {
        return faker.internet.password({ length: length });
    }
}