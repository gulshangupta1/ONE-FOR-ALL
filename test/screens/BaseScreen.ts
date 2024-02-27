import { LOGGER } from '../../utilities/reporting/LoggerHelper';

export class BaseScreen {
    async getElement(locator: string): Promise<WebdriverIO.Element> {
        return await $(locator);
    }

    async getElements(locator: string) {
        return await $$(locator);
    }

    async click(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        const actualTimeout: number = timeout ?? 30000;

        if (typeof element === 'string')
            element = await this.getElement(element);

        await this.waitForDisplayed(element, actualTimeout);
        await element.click();
    }

    async isDisplayed(element: string | WebdriverIO.Element) {
        if (typeof element === 'string')
            element = await this.getElement(element);

        await element.isDisplayed();
    }

    async waitForDisplayed(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        const actualTimeout: number = timeout ?? 30000;

        if (typeof element === 'string')
            element = await this.getElement(element);

        await element.waitForDisplayed({ timeout: actualTimeout });
    }

    async waitForClickable(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        const actualTimeout: number = timeout ?? 30000;

        if (typeof element === 'string')
            element = await this.getElement(element);

        await element.waitForDisplayed({ timeout: actualTimeout });
        await element.waitForClickable({ timeout: actualTimeout });
    }
}