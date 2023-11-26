import {create} from 'zustand';
import {ITransaction} from '../interfaces/transactions';
import {IHistories} from '../interfaces/histories';

export enum SearchType {
	amount = 'amount',
	frequency = 'frequency',
}

export enum TimeRange {
	oneMinute = 60,
	fiveMinutes = 300,
	thirtyMinutes = 1800,
	oneHour = 3600,
}

export enum TimeString {
	'1 minute' = 'oneMinute',
	'5 minutes' = 'fiveMinutes',
	'30 minutes' = 'thirtyMinutes',
	'1 hour' = 'oneHour',
}

export enum SearchString {
	'Highest amount' = 'amount',
	'Most frequently' = 'frequency',
}

type Store = {
	wallet: string;
	transactions: Array<ITransaction>;
	balance: string;
	// history: Array<string>;
	histories: IHistories;
	searchType: SearchType;
	timeRange: TimeRange;
	visibleToast: boolean;
	dataToast: string;

	setWallet: (wallet: string) => void;
	setTransactions: (transactions: Array<ITransaction>) => void;
	setBalance: (balance: string) => void;
	setHistories: (histories: IHistories) => void;
	setSearchType: (searchType: SearchType) => void;
	setTimeRange: (timeRange: TimeRange) => void;
	setVisibleToast: (visibleToast: boolean) => void;
	setDataToast: (dataToast: string) => void;
	// setHistory: (history: Array<string>) => void;
};

const useGlobalStore = create<Store>((set, get) => {
	return {
		wallet: '',
		transactions: [],
		balance: '',
		// history: [],
		histories: [],
		searchType: SearchType.amount,
		timeRange: TimeRange.oneHour,
		visibleToast: false,
		dataToast: '',

		setWallet: (wallet: string) => set(state => ({wallet})),
		setTransactions: (transactions: Array<ITransaction>) => set({transactions}),
		setBalance: (balance: string) => set({balance}),
		// setHistory: (history: Array<string>) => set({history}),
		// setHistory: (history: Array<string>) =>
		// 	set(state => {
		// 		const newHistory = [...state.history, ...history];
		// 		return {history: newHistory};
		// 	}),
		// setHistories: (histories: IHistories) => set({histories}),
		setHistories: (histories: IHistories) =>
			set(state => {
				const newHistories = [...state.histories, ...histories];
				newHistories.sort((a, b) => b.searchAt - a.searchAt);

				return {histories: newHistories};
			}),
		setSearchType: (searchType: SearchType) => set({searchType}),
		// FIXME: 筆記這個({searchType})的用法是什麼意思
		/**
		 *
		 * set({searchType}) 代表  set({searchType: searchType})
		 *
		 */
		setTimeRange: (timeRange: TimeRange) => set({timeRange}),
		setVisibleToast: (visibleToast: boolean) => set({visibleToast}),
		setDataToast: (dataToast: string) => set({dataToast}),
	};
});

export default useGlobalStore;
