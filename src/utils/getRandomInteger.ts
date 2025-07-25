/** Get random `integer` in given `min` - `max` range */
export const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
