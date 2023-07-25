export type ITransactionHistory = {
	wallet: string;
	transactions: Array<ITransaction>;
};

export type ITransaction = {
	txhash: string;
	block: number;
	timestamp: number;
	from: string;
	to: string;
	value: number;
	fee: number;
	status: string;
};
