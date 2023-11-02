/**
 * Rounds a number to the specified number of decimals. If the number is rounded to an Integer, the decimal part is removed
 * @param value 
 * @param maxDecimals 
 * @returns 
 */
export const smartToFixed = (value: number, maxDecimals = 2) => {
    if(!value) return "0";
    return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals });
}