/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param min 
 * @param max 
 * @returns 
 */
export const randomFloat = (min: number, max: number) => {
    return Math.random() * (max - min) + min;

}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * @param min 
 * @param max 
 * @returns 
 */
export const randomFloatInclusive = (min: number, max: number) => {
    return Math.random() * (max - min + 1) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 * @param min 
 * @param max 
 * @returns 
 */
export const randomInt = (min: number, max: number) => {
    return Math.floor(randomFloat(min, max));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param min 
 * @param max 
 * @returns 
 */
export const randomIntInclusive = (min: number, max: number) => {
    return Math.floor(randomFloatInclusive(min, max));
}