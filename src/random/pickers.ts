import { randomInt } from "./numberGenerator";
import * as seedrandom from "seedrandom";

/**
 * Picks a random element from an array
 * @param array 
 * @param seed
 * @returns 
 */
export const pickRandomFromArray = <T>(array: T[], seed?: string | (() => number)) => {
    return array[randomInt(0, array.length, seed)];
}

/**
 * Picks a random character from a string
 * @param str 
 * @param seed
 * @returns 
 */
export const pickRandomCharFromString = (str: string, seed?: string | (() => number)) => {
    return str.charAt(randomInt(0, str.length, seed));
}

/**
 * Picks a random element from an array with weights
 * @param array 
 * @param weights 
 * @param seed
 * @returns 
 */
export const pickRandomFromArrayWithWeights = <T>(array: T[], weights: number[] | ((element: T) => number), seed?: string | (() => number)) => {
    if (typeof weights === 'function') {
        return pickRandomFromArrayWithWeights(array, array.map(weights), seed);   
    }
    if (array.length !== weights.length) {
        throw new Error('Array and weights must be the same length');
    }
    const rnd = !seed ? undefined : (typeof seed === 'string' ? seedrandom(seed) : seed);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = randomInt(0, totalWeight, rnd);
    for (let i = 0; i < array.length; i++) {
        if (random < weights[i]) {
            return array[i];
        }
        random -= weights[i];
    }
    return array[array.length - 1];
}