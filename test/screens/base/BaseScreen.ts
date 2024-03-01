import { SwipeUtils } from "../../../utils/actions/SwipeUtils";
import { LOGGER } from "../../../utils/reporting/LoggerHelper";

export class BaseScreen {
    private timeout: number = 10000;
    private swipeUtils: SwipeUtils;

    constructor() {
        this.swipeUtils = new SwipeUtils();
    }

    protected async getElement(locator: string | WebdriverIO.Element): Promise<WebdriverIO.Element> {
        if (typeof locator === 'string') return await $(locator);
        return locator;
    }

    protected async getElements(locator: string) {
        return await $$(locator);
    }

    protected async clearValue(element: string | WebdriverIO.Element): Promise<void> {
        element = await this.getElement(element);
        await element.clearValue();
    }

    protected async click(element: string | WebdriverIO.Element): Promise<void> {
        element = await this.getElement(element);
        await this.waitForDisplayed(element);
        await element.click();
    }

    protected async getAttribute(element: string | WebdriverIO.Element, attributeName: string): Promise<string> {
        element = await this.getElement(element);
        await element.waitForDisplayed();
        const attribute: string = await element.getAttribute(attributeName);
        return attribute;
    }

    protected async getText(element: string | WebdriverIO.Element): Promise<string> {
        element = await this.getElement(element);
        await element.waitForDisplayed();
        const text: string = await element.getText();
        return text;
    }

    protected async getValue(element: string | WebdriverIO.Element): Promise<string> {
        element = await this.getElement(element);
        await this.waitForDisplayed(element);
        const value: string = await element.getValue();
        return value;
    }

    protected async isClickable(element: string | WebdriverIO.Element, timeout?: number): Promise<boolean> {
        const actualTimeout: number = timeout ?? this.timeout;
        const ele = await this.getElement(element);
        try {
            await ele.waitUntil(async () => {
                return await ele.isClickable();
            }, {
                timeout: actualTimeout,
                timeoutMsg: `${element}: does not displayed after ${actualTimeout} miliseconds`,
                interval: 500
            });
            return true;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    protected async isDisplayed(element: string | WebdriverIO.Element, timeout?: number): Promise<boolean> {
        const actualTimeout: number = timeout ?? this.timeout;
        const ele = await this.getElement(element);
        try {
            await ele.waitUntil(async () => {
                return await ele.isDisplayed();
            }, {
                timeout: actualTimeout,
                timeoutMsg: `${element}: does not displayed after ${actualTimeout} miliseconds`,
                interval: 500
            });
            return true;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    protected async setValue(element: string | WebdriverIO.Element, value: string | number): Promise<void> {
        element = await this.getElement(element);
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    protected async waitForClickable(element: string | WebdriverIO.Element): Promise<void> {
        element = await this.getElement(element);
        await element.waitForDisplayed();
        await element.waitForClickable();
    }

    protected async waitForDisplayed(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        element = await this.getElement(element);
        if (timeout !== undefined) await element.waitForDisplayed({ timeout: timeout });
        else await element.waitForDisplayed();
    }

    async swipeTillElement(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;
        element = await this.getElement(element);

        let isElementDisplayed: boolean = false;
        try {
            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                isElementDisplayed = await element.isDisplayed();
                if (isElementDisplayed) {
                    elementFound = true;
                    break;
                }
                await this.swipeUtils.swipeByPercentage();
            }
            if (!elementFound) LOGGER.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);

            return elementFound;
        } catch (err) {
            LOGGER.error(`Error performing swipe: \n${err.stack}`);
            throw err;
        }
    }

    async swipeHorizontalOnSectionTillElement(section: string | WebdriverIO.Element, element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;

        try {
            section = await this.getElement(section);
            element = await this.getElement(element);

            await this.swipeTillElement(section);
            await this.waitForDisplayed(section);
            const elementSize = await section.getSize();
            const elementLocation = await section.getLocation();

            const y: number = elementLocation.y + (elementSize.height * 0.5);
            const startX: number = elementLocation.x + (elementSize.width * 0.9);
            const endX: number = elementLocation.x + (elementSize.width * 0.1);

            let isElementDisplayed: boolean = false;
            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                isElementDisplayed = await element.isDisplayed();
                if (isElementDisplayed) {
                    elementFound = true;
                    break;
                }

                await this.swipeUtils.horizontalSwipe(startX, endX, y, y);
            }
            if (!elementFound) LOGGER.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);

            return elementFound;
        } catch (err) {
            LOGGER.error(`Error performing horizontal swipe on section.\n${err.stack}`);
            throw err;
        }
    }
}