import { getBrightness } from "./brightnes";

/**
 * Generate a random HEX-color with the given brightness
 * @param minBrightness 
 * @param maxBrightness 
 * @returns 
 */
export const randomHexColor = (minBrightness = 0, maxBrightness = 255) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    let brightness = 0;

    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        brightness = getBrightness(color);
    } while (brightness < minBrightness || brightness > maxBrightness);
    return color;
}