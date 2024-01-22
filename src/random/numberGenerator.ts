import seedrandom from "seedrandom";

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param min 
 * @param max 
 * @param seed
 * @returns 
 */
export const randomFloat = (min: number, max: number, seed?: string) => {
    const rnd = seed ? seedrandom(seed) : Math.random();
    return rnd * (max - min) + min;
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * @param min 
 * @param max 
 * @param seed
 * @returns 
 */
export const randomFloatInclusive = (min: number, max: number, seed?: string) => {
    const rnd = seed ? seedrandom(seed) : Math.random();
    return rnd * (max - min + 1) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 * @param min 
 * @param max 
 * @param seed
 * @returns 
 */
export const randomInt = (min: number, max: number, seed?: string) => {
    return Math.floor(randomFloat(min, max, seed));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param min 
 * @param max 
 * @param seed
 * @returns 
 */
export const randomIntInclusive = (min: number, max: number, seed?: string) => {
    return Math.floor(randomFloatInclusive(min, max, seed));
}