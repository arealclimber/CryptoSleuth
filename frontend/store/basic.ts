import {create} from 'zustand';
import {ITransaction} from '../interfaces/transactions';
import {IHistories} from '../interfaces/histories';

type Store = {
	wallet: string;
	transactions: Array<ITransaction>;
	balance: number;
	// history: Array<string>;
	histories: IHistories;
	setWallet: (wallet: string) => void;
	setTransactions: (transactions: Array<ITransaction>) => void;
	setHistories: (histories: IHistories) => void;
	// setHistory: (history: Array<string>) => void;
};

const useGlobalStore = create<Store>((set, get) => {
	return {
		wallet: '',
		transactions: [],
		balance: 0,
		// history: [],
		histories: [],
		setWallet: (wallet: string) => set(state => ({wallet})),
		setTransactions: (transactions: Array<ITransaction>) => set({transactions}),
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
	};
});

export default useGlobalStore;
