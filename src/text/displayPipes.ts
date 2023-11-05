import { DATE_SHORT } from "../time/commonTimeFormats";
import { formatDate } from "../time/format";

/**
 * Display a generic value range of two values
 * @param min 
 * @param max 
 * @param transform 
 * @returns 
 */
export const genericRangeDisplay = <T>(min: T | undefined, max: T | undefined, transform: (value: T) => string) => {
    if (min === undefined && max === undefined) {
        return undefined;
    }
    if (min === undefined) {
        return `<= ${transform(max!)}`;
    }
    if (max === undefined) {
        return `>= ${transform(min!)}`;
    }
    return `${transform(min!)} - ${transform(max!)}`;
}

/**
 * Display a number range
 * @param min 
 * @param max 
 * @returns 
 */
export const numberRangeDisplay = (min: number | undefined, max: number | undefined) => {
    return genericRangeDisplay(min, max, (value) => value.toString());
}

/**
 * Display a date range
 * @param min 
 * @param max 
 * @param dateFormat 
 */
export const dateRangeDisplay = (min: Date | undefined, max: Date | undefined, dateFormat = DATE_SHORT) => {
    return genericRangeDisplay(min, max, (value) => formatDate(value, dateFormat));
}