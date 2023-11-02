/**
 * Generates a Match value for a string and a search. The lower the value, the better the match with 0 being a perfect match. 
 * A response of 999 means that the search is not contained in the string.
 * @param value 
 * @param search 
 * @returns 
 */
export const stringMatchValue = (value: string, search: string) => {
    const lSearch = search.toLowerCase();
    const lValue = value.toLowerCase();

    if (lValue === lSearch) return 0;
    if (lValue.startsWith(lSearch)) return 1;
    if (lValue.includes(' ' + lSearch)) return 2;
    if (lValue.includes(lSearch)) return 3;

    return 999;
}