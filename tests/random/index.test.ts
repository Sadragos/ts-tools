import { randomInt, randomString, randomStringFromPattern } from '../../src/random';

describe('Testing random number generator', () => {
    test('random integers from 0-10 must contain 0 and not contain 10', () => {
        const resultSet = new Map<number, number>();
        for (let i = 0; i < 10000; i++) {
            const nr = randomInt(0, 10);
            if (resultSet.has(nr)) {
                resultSet.set(nr, resultSet.get(nr)! + 1);
            } else {
                resultSet.set(nr, 1);
            }
        }

        expect(resultSet.has(0)).toBeTruthy();
        expect(resultSet.has(10)).toBeFalsy();
    });
});

describe('Testing seeded random number generator', () => {
    test('random integers from 0-10 must contain 0 and not contain 10', () => {
        for (let i = 0; i < 1000; i++) {
            const nr = randomInt(0, 10, 'myseed123');
            expect(nr).toBe(7);
        }
    });
});

describe('Testing random string generator', () => {
    test('random string must have given length', () => {
        const string = randomString(10);
        expect(string.length).toBe(10);
    });

    test('random string from pattern must have given length', () => {
        const string = randomStringFromPattern('BbBbBbB-bBbB-000');
        expect(string.length).toBe(16);
    });

    test('random string from pattern must have given length', () => {
        const string = randomStringFromPattern('BbBbBbB-bBbB-m00');
        expect(string.length).toBeGreaterThan(16);
    });
});