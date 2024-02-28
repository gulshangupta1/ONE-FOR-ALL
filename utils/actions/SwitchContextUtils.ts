import { LOGGER } from "../reporting/LoggerHelper";

export class SwitchContextUtils {
    private timeout: number = 30000;

    async swictContextByName(contextName: string, timeout?: number): Promise<void> {
        const actualTimeout: number = timeout ?? this.timeout;
        try {
            const currentContext = await driver.getContext();
            if (currentContext.toString().includes(contextName)) {
                return;
            }

            await driver.waitUntil(async () => {
                return (await driver.getContexts()).some(context => context.toString().includes(contextName));
            }, {
                timeout: actualTimeout
            });

            const contexts = await driver.getContexts();
            const context = contexts.find(context => context.toString().includes(contextName));
            await driver.switchContext(context.toString());
        } catch (error) {
            LOGGER.error(`Error during switching to ${contextName} view: \n${error.stack}`);
            throw error;
        }
    }

    async switchToNativeContext(timeout?: number): Promise<void> {
        await this.swictContextByName("NATIVE_APP", timeout);
    }

    async switchToWebContext(timeout?: number): Promise<void> {
        await this.swictContextByName("WEBVIEW", timeout);
    }

    async switchBetweenContexts(timeout?: number): Promise<void> {
        const actualTimeout: number = timeout ?? this.timeout;
        const currentContext = await driver.getContext();
        try {
            await driver.waitUntil(async () => {
                return (await driver.getContexts()).length > 1;
            }, {
                timeout: actualTimeout,
            });
        } catch (error) {
            LOGGER.error(`Not able to switch between contexts because only one context is there.\n${error.stack}`);
            throw error;
        }

        const contexts = await driver.getContexts();
        const toSwitchContext = currentContext.toString() === contexts[0].toString() ? contexts[1] : contexts[0];
        await driver.switchContext(toSwitchContext.toString());
    }
}