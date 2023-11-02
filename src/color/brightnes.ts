/**
 * Calculate the brightness of a color
 * @param color 
 * @returns 
 */
export const getBrightness = (color: string | undefined) => {
    if(!color) return -1;
    // Variables for red, green, blue values
    let r: number, g: number, b: number;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        const colorMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        if (!colorMatch) return -1;
        r = parseFloat(colorMatch[1]);
        g = parseFloat(colorMatch[2]);
        b = parseFloat(colorMatch[3]);
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        const colorValue = color.split('#').pop();

        r = Number(`0x${colorValue?.substring(0, 2)}`);
        g = Number(`0x${colorValue?.substring(2, 4)}`);
        b = Number(`0x${colorValue?.substring(4, 6)}`);
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

/**
 * Check if a color is light or dark
 * @param color 
 * @param breakpoint 
 * @returns 
 */
export const lightOrDark = (color: string, breakpoint = 128) => {
    return (getBrightness(color) >= breakpoint) ? 'light' : 'dark';
}

/**
 * Check if a color is light or dark but reverses the result
 * @param color 
 * @param breakpoint 
 * @returns 
 */
export const lightOrDarkContrast = (color: string | undefined, breakpoint = 128) => {
    return (getBrightness(color) < breakpoint) ? 'light' : 'dark';
}

/**
 * Get the best text color for a background color
 * @param color 
 * @param breakpoint 
 * @returns 
 */
export const contrastTextColor = (color: string, breakpoint = 128) => {
    return lightOrDark(color, breakpoint) === 'light' ? '#000000' : '#ffffff';
}