import { randomInt } from "./numberGenerator";

/**
 * Picks a random element from an array
 * @param array 
 * @returns 
 */
export const pickRandomFromArray = <T>(array: T[]) => {
    return array[randomInt(0, array.length)];
}

/**
 * Picks a random character from a string
 * @param str 
 * @returns 
 */
export const pickRandomCharFromString = (str: string) => {
    return str.charAt(randomInt(0, str.length));
}

/**
 * Picks a random element from an array with weights
 * @param array 
 * @param weights 
 * @returns 
 */
export const pickRandomFromArrayWithWeights = <T>(array: T[], weights: number[] | ((element: T) => number)) => {
    if (typeof weights === 'function') {
        return pickRandomFromArrayWithWeights(array, array.map(weights));   
    }
    if (array.length !== weights.length) {
        throw new Error('Array and weights must be the same length');
    }
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = randomInt(0, totalWeight);
    for (let i = 0; i < array.length; i++) {
        if (random < weights[i]) {
            return array[i];
        }
        random -= weights[i];
    }
    return array[array.length - 1];
}