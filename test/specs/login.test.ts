import { LoggerHelper } from "./../../utilities/reporting/LoggerHelper";

const specName = 'Tymepass Login'
describe('Tymepass Login', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
    });

    it('Trying to login', async () => {
        console.log('Hi Gulshan');
    });
});