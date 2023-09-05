import {useEffect, useState} from 'react';
import {ITransaction, ITransactionHistory} from '../interfaces/transactions';
import Ball from '../components/Ball';
import {wait} from '../utils/common';
import useGlobalStore from '../store/basic';
import CenterBall from '../components/CenterBall';
import CashInBall from '../components/CashInBall';
import CashOutBall from '../components/CashOutBall';
import InfoModal from '../components/InfoModal';
import Toast from '../components/Toast';

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

	const [disable1, setDisable1] = useState<boolean>(false);

	const [visible, setVisible] = useState(true);

	const btnClickHandler = () => {
		setVisible(false);
	};

	const w = 'w-[20.625rem]';
	const h = 'h-[20.625rem]';

	return (
		<main className={``}>
			{/* <InfoModal visible={visible} btnClickHandler={btnClickHandler} /> */}
			<Toast visible={visible} btnClickHandler={btnClickHandler} />
			{/* 轉出的球 */}
			{/* <CashOutBall
				w={w}
				h={h}
				title={`0123abcx`}
				content="asljdfnlas"
				remark="0.55 ETH / $19,463 "
			/> */}

			{/* 轉入的球 */}
			{/* <CashInBall
				w={w}
				h={h}
				title={`0123abcx`}
				content="asljdfnlas"
				remark="0.55 ETH / $19,463 "
			/> */}
		</main>
	);
}
