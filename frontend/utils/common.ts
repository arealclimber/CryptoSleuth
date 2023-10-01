/**
 *
 * @param milleseconds
 * @returns
 */
export const wait = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 *
 * @returns timestamp in seconds
 */
export const getTimestamp = (): number => {
	return Math.floor(Date.now() / 1000);
};
