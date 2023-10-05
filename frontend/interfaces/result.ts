export interface ApiResponse<T> {
	type: string;
	message: string;
	result: T[];
}

export interface FrequencyResult {
	from: string;
	to: string;
	txhash_array: string[];
	frequency: number;
}

export interface AmountResult {
	from: string;
	to: string;
	txhash_array: string[];
	value: string;
}

export const frequencyResponse: ApiResponse<FrequencyResult> = {
	type: 'frequency',
	message: 'OK',
	result: [
		{
			'from': '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
			'to': '0x4675c7e5baafbffbca748158becba61ef3b0a263',
			'txhash_array': [
				'0x176cd64149756c08bab32f6cd275be4994d861cb758f1b2235ae15ded0c0bce6',
			],
			'frequency': 1,
		},
		{
			'from': '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
			'to': '0x388c818ca8b9251b393131c08a736a67ccb19297',
			'txhash_array': [
				'0xf9c2efa2d22f94378f5719a1071bbced049c8be61daf8c2a894c6d6ee8825c98',
				'0x7595b58a3be0bcfb459d6b7a2af2e9b6266f07818e06149b11c90420ce0ec9b0',
				'0x2e6453c167ab541432195167ad22725fa97c3e599235e8a1e12206c12888df89',
			],
			'frequency': 3,
		},
	],
};

export const amountResponse: ApiResponse<AmountResult> = {
	type: 'amount',
	message: 'OK',
	result: [
		{
			'from': '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5',
			'to': '0x388c818ca8b9251b393131c08a736a67ccb19297',
			'txhash_array': [
				'0x2e6453c167ab541432195167ad22725fa97c3e599235e8a1e12206c12888df89',
				'0xb90ea43fd5ec02511f793104ed21454c8def6822dae040f31710ec26278625d9',
				'0x56965010509a56c618f1806450b8db09748d16cc26907eb571eccc340d4d3575',
			],
			'value': '276915141566179851',
		},
		{
			'from': '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5',
			'to': '0x4675c7e5baafbffbca748158becba61ef3b0a263',
			'txhash_array': [
				'0x176cd64149756c08bab32f6cd275be4994d861cb758f1b2235ae15ded0c0bce6',
			],
			'value': '31925958069239430',
		},
	],
};

export function isValidString(value: any): boolean {
	return typeof value === 'string';
}

export function isValidNumber(value: any): boolean {
	return typeof value === 'number';
}

export function isValidArray(value: any): boolean {
	return Array.isArray(value);
}

export function isValidFrequencyResult(result: FrequencyResult): boolean {
	return (
		isValidString(result.from) &&
		isValidString(result.to) &&
		isValidArray(result.txhash_array) &&
		result.txhash_array.every(isValidString) &&
		isValidNumber(result.frequency)
	);
}

export function isValidAmountResult(result: AmountResult): boolean {
	return (
		isValidString(result.from) &&
		isValidString(result.to) &&
		isValidArray(result.txhash_array) &&
		result.txhash_array.every(isValidString) &&
		isValidString(result.value)
	);
}

export function validateApiResponse<T>(
	response: ApiResponse<T>,
	validator: (result: T) => boolean
): boolean {
	return (
		isValidString(response.type) &&
		isValidString(response.message) &&
		isValidArray(response.result) &&
		response.result.every(validator)
	);
}
