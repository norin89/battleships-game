import { describe, it, expect } from 'vitest';
import { numberIndexToAlphanumeric, alphanumericIndexToNumber } from './convertIndex';

describe('numberIndexToAlphanumeric', () => {
	it('should convert 0 to "a"', () => {
		expect(numberIndexToAlphanumeric(0)).toBe('a');
	});

	it('should convert 26 to "aa"', () => {
		expect(numberIndexToAlphanumeric(26)).toBe('aa');
	});

	it('should convert 64 to "bm"', () => {
		expect(numberIndexToAlphanumeric(64)).toBe('bm');
	});

	it('should convert 418 to "pc"', () => {
		expect(numberIndexToAlphanumeric(418)).toBe('pc');
	});

	it('should throw an error on negative number', () => {
		expect(() => numberIndexToAlphanumeric(-1)).toThrowError();
	});

	it('should throw an error on non-integer index', () => {
		expect(() => numberIndexToAlphanumeric(3.14)).toThrowError();
	});
});

describe('alphanumericIndexToNumber', () => {
	it('should convert "a" to "0"', () => {
		expect(alphanumericIndexToNumber('a')).toBe(0);
	});

	it('should convert "aa" to 26"', () => {
		expect(alphanumericIndexToNumber('aa')).toBe(26);
	});

	it('should convert "bm" to 64', () => {
		expect(alphanumericIndexToNumber('bm')).toBe(64);
	});

	it('should convert "pc" to 418', () => {
		expect(alphanumericIndexToNumber('pc')).toBe(418);
	});

	it('should throw an error on when restricted characters passed', () => {
		expect(() => alphanumericIndexToNumber('abc123')).toThrowError();
	});
});
