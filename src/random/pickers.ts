import { randomInt } from "./numberGenerator";

/**
 * Picks a random element from an array
 * @param array 
 * @param seed
 * @returns 
 */
export const pickRandomFromArray = <T>(array: T[], seed?: string) => {
    return array[randomInt(0, array.length, seed)];
}

/**
 * Picks a random character from a string
 * @param str 
 * @param seed
 * @returns 
 */
export const pickRandomCharFromString = (str: string, seed?: string) => {
    return str.charAt(randomInt(0, str.length, seed));
}

/**
 * Picks a random element from an array with weights
 * @param array 
 * @param weights 
 * @param seed
 * @returns 
 */
export const pickRandomFromArrayWithWeights = <T>(array: T[], weights: number[] | ((element: T) => number), seed?: string) => {
    if (typeof weights === 'function') {
        return pickRandomFromArrayWithWeights(array, array.map(weights), seed);   
    }
    if (array.length !== weights.length) {
        throw new Error('Array and weights must be the same length');
    }
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = randomInt(0, totalWeight, seed);
    for (let i = 0; i < array.length; i++) {
        if (random < weights[i]) {
            return array[i];
        }
        random -= weights[i];
    }
    return array[array.length - 1];
}