const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Returns the letter corresponding to a given index (e.g., 0 -> 'a', 1 -> 'b', ..., 25 -> 'z').
 * If the index exceeds 26, it continues with 'aa', 'ab', etc.
 **/
export const numberIndexToAlphanumeric = (idx: number): string => {
	if (idx < 0 || !Number.isInteger(idx)) {
		throw new Error(`Invalid index - ${idx}. Index must be a non-negative integer.`);
	}

	const letterIndex = idx % LETTERS.length; // Get letter index with modulus
	const resultsLength = Math.floor(idx / LETTERS.length); // Calculate how many letters are needed

	let result = `${LETTERS[letterIndex]}`;

	if (resultsLength > 0) {
		result = `${numberIndexToAlphanumeric(resultsLength - 1)}${result}`;
	}

	return result;
};

/**
 * Return number index corresponding to a given alphanumeric index (e.g., 'a' -> 0, 'b' -> 1, ..., 'z' -> 25).
 * Opposite to `numberIndexToAlphanumeric()`.
 **/
export const alphanumericIndexToNumber = (alphanumericIdx: string): number => {
	if (!new RegExp(`^[${LETTERS}]+$`).test(alphanumericIdx)) {
		throw new Error(
			`Invalid index - "${alphanumericIdx}". Alphanumeric index must only contain lowercase letters - '${LETTERS}'.`,
		);
	}

	// // Reverse values for easier calculations
	const alphanumericIdxArray = [...alphanumericIdx].reverse();

	return alphanumericIdxArray.reduce((result, letter, idx) => {
		const letterIndex = LETTERS.indexOf(letter);
		// If last letter return its value else calculate value based on its position
		const letterValue = idx ? Math.pow(LETTERS.length, idx) * (letterIndex + 1) : letterIndex;
		return result + letterValue;
	}, 0);
};
