import type { Options } from '@wdio/types'
import fs from 'fs';

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [`${process.cwd()}/test/web/specs/**/*.ts`],
    exclude: [],
    maxInstances: 1,
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // @ts-ignore: noUnusedParameters
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!fs.existsSync("./errorShots")) {
            fs.mkdirSync("./errorShots");
        }
        if (!passed) {
            await driver.saveScreenshot(`./errorShots/${test.title.replaceAll(" ", "_")}.png`);
        }
    },
    before: async function () {
        await browser.url(this.baseUrl);
    },
}
