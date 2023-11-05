import { pickRandomCharFromString, pickRandomFromArray } from "./pickers";

export const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
export const DIGITS = '0123456789';
export const SYMBOLS = '!@#$%^&*()_+-=[]{};:,./<>?';
export const ALPHA = UPPER_CASE + LOWER_CASE;
export const ALPHA_NUMERIC = UPPER_CASE + LOWER_CASE + DIGITS;
export const ALPHA_NUMERIC_SYMBOLS = ALPHA_NUMERIC + SYMBOLS;
export const HEX = DIGITS + 'ABCDEF';
export const VOCALS_UPPER = 'AEIOU';
export const VOCALS_LOWER = 'aeiou';
export const VOCALS = VOCALS_UPPER + VOCALS_LOWER;
export const CONSONANTS_UPPER = 'BCDFGHJKLMNPQRSTVWXYZ';
export const CONSONANTS_LOWER = 'bcdfghjklmnpqrstvwxyz';
export const CONSONANTS = CONSONANTS_UPPER + CONSONANTS_LOWER;
export const GREEK_LETTERS: string[] = [
    'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
    'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi',
    'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'
];
export const MILITARY_ALPHABET: string[] = [
    'alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel',
    'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa',
    'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'x-ray',
    'yankee', 'zulu'
];
export type GeneratorPattern = { [key: string]: string | string[] };

/**
 * Default Pattern Generator
 * 
 * A: Upper Case Letters
 * a: Lower Case Letters
 * 0: Digits
 * x: Alpha (Upper and Lower Case Letters)
 * X: Alpha Numeric (Upper and Lower Case Letters and Digits)
 * #: Alpha Numeric and Symbols (Upper and Lower Case Letters, Digits and Symbols)
 * h: Hex (Digits and ABCDEF)
 * V: Vocals Upper Case
 * C: Consonants Upper Case
 * v: Vocals Lower Case
 * c: Consonants Lower Case
 * b: Vocals (Upper and Lower Case)
 * B: Consonants (Upper and Lower Case)
 * g: Greek Letters (alpha, beta, gamma, ...)
 * m: Military Alphabet (alpha, bravo, charlie, ...)
 */
export const DEFAULT_PATTERN_GENERATOR: GeneratorPattern = {
    'A': UPPER_CASE,
    'a': LOWER_CASE,
    '0': DIGITS,
    'x': ALPHA,
    'X': ALPHA_NUMERIC,
    '#': ALPHA_NUMERIC_SYMBOLS,
    'h': HEX,
    'V': VOCALS_UPPER,
    'C': CONSONANTS_UPPER,
    'v': VOCALS_LOWER,
    'c': CONSONANTS_LOWER,
    'b': VOCALS,
    'B': CONSONANTS,
    'g': GREEK_LETTERS,
    'm': MILITARY_ALPHABET
}


/**
 * Returns a random string of specified length
 * @param length 
 * @param chars 
 * @returns 
 */
export const randomString = (length: number, characterPool: string = ALPHA_NUMERIC) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += pickRandomCharFromString(characterPool);
    }
    return result;
}

/**
 * Returns a random matching the given pattern and pattern Generator
 * @param pattern 
 * @param patternGenerator 
 * @returns 
 * @see DEFAULT_PATTERN_GENERATOR
 */
export const randomStringFromPattern = (pattern: string, patternGenerator: GeneratorPattern = DEFAULT_PATTERN_GENERATOR) => {
    let result = '';
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern.charAt(i);
        if (char === '\\' && i < pattern.length - 1 && patternGenerator.hasOwnProperty(pattern.charAt(i + 1))) {
            result += pattern.charAt(++i);
        } else if (patternGenerator.hasOwnProperty(char)) {
            if (Array.isArray(patternGenerator[char])) {
                result += pickRandomFromArray(patternGenerator[char] as string[]);
            } else {
                result += pickRandomCharFromString(patternGenerator[char] as string);
            }
        } else {
            result += char;
        }
    }
    return result;
}