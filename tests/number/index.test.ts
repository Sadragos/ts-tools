import { convertBytes } from '../../src/number/fileSize';
describe('Testing byte conversions', () => {
    test('converting 0 bytes', () => {
        const string = convertBytes(0);
        expect(string).toBe('0 Bytes');
    });

    test('converting 1024 bytes', () => {
        const string = convertBytes(1024);
        expect(string).toBe('1 Kb');
    });

    test('converting 2000 bytes', () => {
        const string = convertBytes(2000);
        expect(string).toBe('1.95 Kb');
    });

    test('converting 1024*1024 bytes', () => {
        const string = convertBytes(1024*1024);
        expect(string).toBe('1 Mb');
    });

});