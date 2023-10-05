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

// truncate the string into first 6 and last 4 characters
export const truncateString = (str: string): string => {
	if (str.length <= 9) return str;
	return str.slice(0, 4) + '...' + str.slice(-5);
};

export function weiToEth(weiStr: string): string {
	const wei: BigInt = BigInt(weiStr);
	const divisor: BigInt = BigInt('1000000000000000000'); // 10^18
	return (Number(wei) / Number(divisor)).toString();
}
