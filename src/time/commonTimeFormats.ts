export const DATE_SHORT: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
export const DATE_LONG: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
export const TIME_SHORT: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
export const TIME_LONG: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
export const DATE_TIME_SHORT: Intl.DateTimeFormatOptions = { ...DATE_SHORT, ...TIME_SHORT };
export const DATE_TIME_LONG: Intl.DateTimeFormatOptions = { ...DATE_LONG, ...TIME_LONG };
export const DATE_WITH_WEEKDAY: Intl.DateTimeFormatOptions = { weekday: 'long', ...DATE_LONG };