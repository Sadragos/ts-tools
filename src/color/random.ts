import { DEFAULT_PATTERN_GENERATOR, randomStringFromPattern } from "../random/patternGenerator";
import { getBrightness } from "./brightnes";

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

    do {
        color = randomStringFromPattern('\\#hhhhhh', DEFAULT_PATTERN_GENERATOR, seed);
        brightness = getBrightness(color);
    } while (brightness < minBrightness || brightness > maxBrightness);
    return color;
}