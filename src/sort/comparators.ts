import { stringMatchValue } from "../search/weightedSearch";

export type CompareFn<T> = (a: T | undefined, b: T | undefined, direction: 0 | 1 | -1) => number;
export type CompareMatchFn = (a: string | undefined, b: string | undefined, search: string | undefined, direction: 0 | 1 | -1) => number;

/**
 * Generates a compare function, that compares on multiple levels.
 * @param compareFns 
 * @returns 
 */
export const multiLevelCompare = <E>(...compareFns: CompareFn<E>[]): CompareFn<E> => {
    return ((a: E, b: E, direction: 0 | 1 | -1) => {
        if (a === undefined && b === undefined) return 0;
        if (a === undefined) return direction;
        if (b === undefined) return -direction;

        for (const compareFn of compareFns) {
            const result = compareFn(a, b, direction);
            if (result !== 0) return result;
        }
        return 0;
    });
}

/**
 * Generates a compare function for the specified extractor and compare function.
 * @param extractor 
 * @param compareFn 
 * @returns 
 */
export const generateDynamicCompareFn = <E, T>(
    extractor: (element: E) => T,
    compareFn: CompareFn<T>
) => {
    return ((a: E, b: E, direction: 0 | 1 | -1) => compareFn(extractor(a), extractor(b), direction));
}

/**
 * Generates a compare function for the specified attribute and compare function.
 * @param attribute 
 * @param compareFn 
 * @returns 
 */
export const generateCompareFn = <E, T> (
    attribute: keyof E,
    compareFn: CompareFn<T>
) => {
    return generateDynamicCompareFn<E, T>((element) => element[attribute] as T, compareFn);
}

/**
 * Compares two numbers. If the direction is 1, the result is a - b. If the direction is -1, the result is b - a. If the direction is 0, the result is 0.
 * @param a 
 * @param b 
 * @param direction 
 * @returns 
 */
export const compareNumber: CompareFn<number> = (a, b, direction = 1) => {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return direction;
    if (b === undefined) return -direction;
    return (a - b) * direction;
}

/**
 * Compares two strings. If the direction is 1, the result is a.localeCompare(b). If the direction is -1, the result is b.localeCompare(a). If the direction is 0, the result is 0.
 * @param a 
 * @param b 
 * @param direction 
 * @returns 
 */
export const compareString: CompareFn<string> = (a, b, direction = 1) => {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return direction;
    if (b === undefined) return -direction;
    return a.localeCompare(b) * direction;
}

/**
 * Compares two dates. If the direction is 1, the result is a.getTime() - b.getTime(). If the direction is -1, the result is b.getTime() - a.getTime(). If the direction is 0, the result is 0.
 * @param a 
 * @param b 
 * @param direction 
 * @returns 
 */
export const compareDate: CompareFn<Date> = (a, b, direction = 1) => {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return direction;
    if (b === undefined) return -direction;
    return (a.getTime() - b.getTime()) * direction;
}

/**
 * Compares two strings and using stringMatchValue
 * @param a 
 * @param b 
 * @param search 
 * @param direction 
 * @returns 
 * @see stringMatchValue
 */
export const compareWithSearch: CompareMatchFn = (a, b, search, direction = 1)  => {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return direction;
    if (b === undefined) return -direction;
    const val1 = stringMatchValue(a, search);
    const val2 = stringMatchValue(b, search);
    return (val1 - val2) * direction;
}