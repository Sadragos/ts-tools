import { DEFAULT_PATTERN_GENERATOR, randomStringFromPattern } from "../random/patternGenerator";
import { getBrightness } from "./brightnes";
import * as seedrandom from "seedrandom";

/**
 * Generate a random HEX-color with the given brightness
 * @param minBrightness 
 * @param maxBrightness 
 * @param seed
 * @returns 
 */
export const randomHexColor = (minBrightness = 0, maxBrightness = 255, seed?: string) => {
    let color = '';
    let brightness = 0;

    const rnd = !seed ? undefined : (typeof seed === 'string' ? seedrandom(seed) : seed);
    do {
        color = randomStringFromPattern('\\#hhhhhh', DEFAULT_PATTERN_GENERATOR, rnd);
        brightness = getBrightness(color);
    } while (brightness < minBrightness || brightness > maxBrightness);
    return color;
}