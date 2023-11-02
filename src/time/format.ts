import { DATE_TIME_SHORT } from "./commonTimeFormats";

/**
 * Formats a date to a string
 * @param time 
 * @param options 
 * @returns 
 */
export const formatDate = (time: Date, options: Intl.DateTimeFormatOptions = DATE_TIME_SHORT) => {
    return time.toLocaleDateString(undefined, options);
}