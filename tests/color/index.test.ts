import { contrastTextColor, getBrightness, lightOrDark, lightOrDarkContrast, randomHexColor } from '../../src/color';

describe('testing color brightness', () => {
    test('brightness of #000000 should be 0', () => {
        expect(getBrightness('#000000')).toBeCloseTo(0);
    });
    test('brightness of rgb(0,0,0) should be 0', () => {
        expect(getBrightness('rgb(0,0,0)')).toBeCloseTo(0);
    });
    test('brightness of #ffffff should be 255', () => {
        expect(getBrightness('#ffffff')).toBeCloseTo(255);
    });
    test('brightness of rgb(255,255,255) should be 255', () => {
        expect(getBrightness('rgb(255,255,255)')).toBeCloseTo(255);
    });
    test('brightness of rgb(140,134,208) should be 140.618', () => {
        expect(getBrightness('rgb(140,134,208)')).toBeCloseTo(140.618);
    });
});

describe('testing random color', () => {
    test('generate any random color', () => {
        expect(randomHexColor()).toMatch(/#[0123456789ABCDEF]{6}/);
    });
    test('generate color with > 150 brightnes', () => {
        const color = randomHexColor(150);
        expect(getBrightness(color)).toBeGreaterThanOrEqual(150);
    });
    test('generate color with < 150 brightnes', () => {
        const color = randomHexColor(0, 150);
        expect(getBrightness(color)).toBeLessThanOrEqual(150);
    });
    test('generate color with 100-200 brightnes', () => {
        const color = randomHexColor(100, 200);
        expect(getBrightness(color)).toBeGreaterThanOrEqual(100);
        expect(getBrightness(color)).toBeLessThanOrEqual(200);
    });
});

describe('testing color contrast', () => {
    test('lightOrDark should return light for #ffffff', () => {
        expect(lightOrDark('#ffffff')).toBe('light');
    });
    test('lightOrDark should return dark for #000000', () => {
        expect(lightOrDark('#000000')).toBe('dark');
    });
    test('lightOrDarkContrast should return dark for #ffffff', () => {
        expect(lightOrDarkContrast('#ffffff')).toBe('dark');
    });
    test('lightOrDarkContrast should return light for #000000', () => {
        expect(lightOrDarkContrast('#000000')).toBe('light');
    });
    test('bestTextColor should return #000000 for #ffffff', () => {
        expect(contrastTextColor('#ffffff')).toBe('#000000');
    });
    test('contrastTextColor should return #ffffff for #000000', () => {
        expect(contrastTextColor('#000000')).toBe('#ffffff');
    });
});