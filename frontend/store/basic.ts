import {create} from 'zustand';
import {ITransaction} from '../interfaces/transactions';

type Store = {
	wallet: string;
	transactions: Array<ITransaction>;
	balance: number;
	setWallet: (wallet: string) => void;
	setTransactions: (transactions: Array<ITransaction>) => void;
};

const useGlobalStore = create<Store>((set, get) => {
	return {
		wallet: '',
		transactions: [],
		balance: 0,
		setWallet: (wallet: string) => set(state => ({wallet})),
		setTransactions: (transactions: Array<ITransaction>) => set({transactions}),
	};
});

export default useGlobalStore;
