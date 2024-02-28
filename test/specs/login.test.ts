import { LoggerHelper } from "../../utils/reporting/LoggerHelper";

const specName: string = 'Timepass Login';
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
    });

    it('Trying to login', async () => {
        console.log('Hi');
    });
});