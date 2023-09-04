import {useEffect, useState} from 'react';
import {ITransaction, ITransactionHistory} from '../interfaces/transactions';
import Ball from '../components/Ball';
import {wait} from '../utils/common';
import useGlobalStore from '../store/basic';
import CenterBall from '../components/CenterBall';
import CashInBall from '../components/CashInBall';
import CashOutBall from '../components/CashOutBall';

const API = `/api/wallet/transactions/history`;
enum MOVE_TO {
	RIGHT = 'translate-x-[200px]',
	RIGHT_TOP = 'translate-x-[200px] -translate-y-[200px]',
	RIGHT_DOWN = 'translate-x-[200px] translate-y-[200px]',
	LEFT = '-translate-x-[200px]',
	LEFT_TOP = '-translate-x-[200px] -translate-y-[200px]',
	TOP = '-translate-y-[200px]',
	BOTTOM = 'translate-y-[200px]',
	STILL = 'bg-gray-200',
}

export default function Trial() {
	const wallet = useGlobalStore(state => state.wallet);

	const [walletAddress, setWalletAddress] = useState<string>('');
	const [data, setData] = useState<ITransactionHistory | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [changed1, setChanged1] = useState<boolean>(false);
	const [changed2, setChanged2] = useState<boolean>(false);
	const [changed3, setChanged3] = useState<boolean>(false);
	const [changed4, setChanged4] = useState<boolean>(false);
	const [changed5, setChanged5] = useState<boolean>(false);

	const [disable1, setDisable1] = useState<boolean>(false);

	const requestHandler = async (walletAddress: string) => {
		setLoading(true);
		setData(undefined);

		const result = await fetch(`${API}/${walletAddress}`)
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP error ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				setData(data);
			})
			.catch(err => {
				// FIXME: to be removed
				console.error('Fetch failed', err);
			});
		await wait(1000);
		setLoading(false);
	};

	const btnClickHandler = async () => {
		await requestHandler(walletAddress.toLowerCase());
	};

	const ballClickHandlersRouter = () => {
		return {
			ball1: () => {
				setChanged1(!changed1);
			},
			ball2: () => {
				setChanged2(!changed2);
			},
			ball3: () => {
				setChanged3(!changed3);
			},
			ball4: () => {
				setChanged4(!changed4);
			},
			ball5: () => {
				setChanged5(!changed5);
			},
		};
	};

	const ballClickHandlers = ballClickHandlersRouter();

	// const w = 'w-[12.5rem]';
	// const h = 'h-[12.5rem]';

	const w = 'w-[20.625rem]';
	const h = 'h-[20.625rem]';

	return (
		<main className={``}>
			{/* 轉出的球 */}
			<CashOutBall
				w={w}
				h={h}
				title={`0123abcx`}
				content="asljdfnlas"
				remark="0.55 ETH / $19,463 "
			/>

			{/* 轉入的球 */}
			<CashInBall
				w={w}
				h={h}
				title={`0123abcx`}
				content="asljdfnlas"
				remark="0.55 ETH / $19,463 "
			/>
		</main>
	);
}
