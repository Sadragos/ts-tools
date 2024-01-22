
export type Granuality = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
export type Timetable<T> = {
    start: Date;
    items: T[];
}[];
export type DateDiff = {
    amount: number;
    granularity: Granuality;
}

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
export const getISOWeekNumber = (date: Date, offset: number = 0): number => {
    const tempDate = new Date(date);

    // Setze das Datum auf den 4. Januar, weil die ISO-Woche immer am Montag startet
    tempDate.setMonth(0); // Januar
    tempDate.setDate(4);

    // Finde den ersten Montag im Jahr
    while (tempDate.getDay() !== 1) {
        tempDate.setDate(tempDate.getDate() + 1);
    }

    // Berechne die Differenz zwischen dem gegebenen Datum und dem 4. Januar
    const timeDiff = date.getTime() - tempDate.getTime();

    // Berechne die Anzahl der Wochen
    const weekNumber = Math.ceil((timeDiff / (7 * 24 * 60 * 60 * 1000)) + 1);

    return weekNumber;
}

/**
 * Flattens a date to the given granuality
 * @param date 
 * @param granuality 
 * @returns 
 */
export const flattenDate = (date: Date, granuality: Granuality = 'second'): Date => {
    const flattened = new Date(date);

    if (granuality === 'millisecond') return flattened;
    else if (granuality === 'second') flattened.setMilliseconds(0);
    else if (granuality === 'minute') flattened.setSeconds(0, 0);
    else if (granuality === 'hour') flattened.setMinutes(0, 0, 0);
    else if (granuality === 'day') {
        flattened.setHours(0, 0, 0, 0);
    } else if (granuality === 'week') {
        flattened.setDate(flattened.getDate() - flattened.getDay());
        flattened.setHours(0, 0, 0, 0);
    } else if (granuality === 'month') {
        flattened.setDate(1);
        flattened.setHours(0, 0, 0, 0);
    } else if (granuality === 'year') {
        flattened.setMonth(0);
        flattened.setDate(1);
        flattened.setHours(0, 0, 0, 0);
    }
    return flattened;
}

/**
 * Returns the start of the day
 * @param date 
 * @returns 
 */
export const getStartOfDay = (date: Date): Date => {
    return flattenDate(date, 'day');
}

/**
 * Returns the start of the week
 * @param date 
 * @returns 
 */
export const getStartOfWeek = (date: Date): Date => {
    return flattenDate(date, 'week');
}

/**
 * Returns the start of the month
 * @param date 
 * @returns 
 */
export const getStartOfMonth = (date: Date): Date => {
    return flattenDate(date, 'month');
}

/**
 * Returns the start of the year
 * @param date 
 * @returns 
 */
export const getStartOfYear = (date: Date): Date => {
    return flattenDate(date, 'year');
}

/**
 * Checks if two dates are the same
 * @param date1 
 * @param date2 
 * @param granuality 
 * @returns 
 */
export const isSame = (date1: Date, date2: Date, granuality: Granuality = 'millisecond'): boolean => {
    return flattenDate(date1, granuality).getTime() === flattenDate(date2, granuality).getTime();
}

/**
 * Checks if date1 is before date2
 * @param date1 
 * @param date2 
 * @param granuality 
 * @returns 
 */
export const isBefore = (date1: Date, date2: Date, granuality: Granuality = 'millisecond'): boolean => {
    return flattenDate(date1, granuality).getTime() < flattenDate(date2, granuality).getTime();
}

/**
 * Checks if date1 is after date2
 * @param date1 
 * @param date2 
 * @param granuality 
 * @returns 
 */
export const isAfter = (date1: Date, date2: Date, granuality: Granuality = 'millisecond'): boolean => {
    return flattenDate(date1, granuality).getTime() > flattenDate(date2, granuality).getTime();
}

/**
 * Checks if date1 is the same or before date2
 * @param date1 
 * @param date2 
 * @param granuality 
 * @returns 
 */
export const isSameOrBefore = (date1: Date, date2: Date, granuality: Granuality = 'millisecond'): boolean => {
    return flattenDate(date1, granuality).getTime() <= flattenDate(date2, granuality).getTime();
}

/**
 * Checks if date1 is the same or after date2
 * @param date1 
 * @param date2 
 * @param granuality 
 * @returns 
 */
export const isSameOrAfter = (date1: Date, date2: Date, granuality: Granuality = 'millisecond'): boolean => {
    return flattenDate(date1, granuality).getTime() >= flattenDate(date2, granuality).getTime();
}

/**
 * Splits the items into a timetable with the given granuality
 * @param items 
 * @param extractor 
 * @param granuality 
 * @returns 
 */
export const getTimeTable = <T>(items: T[], extractor: (item: T) => Date, granuality: Granuality = 'day'): Timetable<T> => {
    if (!items || items.length === 0) return [];
    const result: Timetable<T> = [];
    let currentDate = flattenDate(new Date(0), granuality);
    items.forEach((item) => {
        const itemDate = flattenDate(extractor(item), granuality);
        if(!isSame(currentDate, itemDate)) {
            currentDate = itemDate;
            result.push({
                start: currentDate,
                items: []
            });
        }
        result[result.length - 1].items.push(item);
    });

    return result;
}

export const dateDiff = (dateStart: Date, dateEnd: Date, granuality: Granuality | 'auto' = 'auto'): DateDiff => {
    const diff = dateEnd.getTime() - dateStart.getTime();
    if (granuality === 'millisecond' || diff < 1000) return { amount: diff, granularity: 'millisecond' };
    if (granuality === 'second' || diff < 1000 * 60) return { amount: Math.floor(diff / 1000), granularity: 'second' };
    if (granuality === 'minute' || diff < 1000 * 60 * 60) return { amount: Math.floor(diff / (1000 * 60)), granularity: 'minute' };
    if (granuality === 'hour' || diff < 1000 * 60 * 60 * 24) return { amount: Math.floor(diff / (1000 * 60 * 60)), granularity: 'hour' };
    if (granuality === 'day' || diff < 1000 * 60 * 60 * 24 * 7) return { amount: Math.floor(diff / (1000 * 60 * 60 * 24)), granularity: 'day' };
    if (granuality === 'week' || diff < 1000 * 60 * 60 * 24 * 30) return { amount: Math.floor(diff / (1000 * 60 * 60 * 24 * 7)), granularity: 'week' };
    if (granuality === 'month' || diff < 1000 * 60 * 60 * 24 * 365) return { amount: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)), granularity: 'month' };
    return { amount: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)), granularity: 'year' };
}