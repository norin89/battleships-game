const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Returns the letter corresponding to a given index (e.g., 0 -> 'a', 1 -> 'b', ..., 25 -> 'z').
 * If the index exceeds 26, it continues with 'aa', 'ab', etc.
 **/
export const numberIndexToAlphanumeric = (idx: number): string => {
	if (idx < 0) {
		throw new Error('Index must be a non-negative integer');
	}

	const letterIndex = idx % LETTERS.length; // Get letter index with modulus
	const resultsLength = Math.floor(idx / LETTERS.length); // Calculate how many letters are needed

	let result = `${LETTERS[letterIndex]}`;

	if (resultsLength > 0) {
		result = `${numberIndexToAlphanumeric(resultsLength - 1)}${result}`;
	}

	return result;
};
