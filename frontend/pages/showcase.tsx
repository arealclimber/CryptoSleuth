/**
 * TODO:
 * 拿 filter dropdown 來 call API
 * 重構 API calling client
 * 轉入轉出球的文字排版
 * 轉入轉出球的計算大小
 * 轉入轉出球的在頁面上的排版
 * 轉入轉出球移動的動畫
 * 轉入轉出球的 hover 效果
 * Search History 的功能
 * Search History 的排版
 * Ball details modal
 * useOuterClick
 * Toast
 *
 */
import Image from 'next/image';
import Link from 'next/link';
import React, {useRef, useState} from 'react';
import {ITransaction} from '../interfaces/transactions';
import useGlobalStore, {
	SearchString,
	SearchType,
	TimeRange,
	TimeString,
} from '../store/basic';
import CenterBall from '../components/CenterBall';
import {API_URL} from '../config/api';
import Dropdown from '../components/Dropdown';
import InfoModal from '../components/InfoModal';
import Toast from '../components/Toast';
import CashOutBall from '../components/CashOutBall';
import CashInBall from '../components/CashInBall';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import {ethers} from 'ethers';
import {getTimestamp, truncateString, weiToEth} from '../utils/common';
import {
	DEFAULT_WALLET,
	DEFAULT_WALLET_1,
	DEFAULT_WALLET_2,
	RADIUS,
	h,
	w,
} from '../config/config';
import CashOutBall1 from '../components/CashOutBall1';
import CashOutBall2 from '../components/CashOutBall2';

const Showcase = () => {
	const [
		wallet,
		setWallet,
		balance,
		setBalance,
		histories,
		setHistories,
		searchType,
		setSearchType,
		timeRange,
		setTimeRange,
	] = useGlobalStore(state => [
		state.wallet,
		state.setWallet,
		state.balance,
		state.setBalance,
		state.histories,
		state.setHistories,
		state.searchType,
		state.setSearchType,
		state.timeRange,
		state.setTimeRange,
	]);

	const inputRef = useRef<HTMLInputElement>(null);
	const [walletHistories, setWalletHistories] = useState(Array<ITransaction>);
	const [loading, setLoading] = useState<boolean>(false);
	// const [searchType, setSearchType] = useState<SearchType>(SearchType.amount);
	// const [timeRange, setTimeRange] = useState<TimeRange>(
	// 	TimeRange.fiveMinutes
	// );
	const [toastVisible, setToastVisible] = useState(false);

	const getTimeRange = (range: string) => {
		const timeString = TimeString[range as keyof typeof TimeString];
		if (timeString) {
			const range = TimeRange[timeString];
			setTimeRange(range);
		}
		// switch (range) {
		// 	case '1 minute':
		// 		return TimeRange.oneMinute;
		// 	case '5 minutes':
		// 		return TimeRange.fiveMinutes;
		// 	case '30 minutes':
		// 		return TimeRange.thirtyMinutes;
		// 	case '1 hour':
		// 		return TimeRange.oneHour;
		// 	default:
		// 		return TimeRange.fiveMinutes;
		// }
	};

	const getFilterType = (item: string) => {
		console.log('getFilterType', item);
		const typeString = SearchString[item as keyof typeof SearchString];
		if (typeString) {
			const type = SearchType[typeString];
			console.log('type', type);

			setSearchType(type);
		}
	};

	const btnClickHandler = () => {
		setToastVisible(prev => !prev);
	};

	const validateAddress = (address: string): boolean => {
		const valid = ethers.isAddress(address);
		console.log('address', address, 'rs', valid);
		return valid;
	};

	// TODO: get the balance of targeted address
	const fetcher = async (url: string, config?: any): Promise<any> => {
		let response;

		try {
			response = await axios(url, config);
			console.log('res', response.data);
		} catch (err) {
			console.error('error', err);
			throw err;
		}

		return response.data;
	};

	const searchClickHandler = async () => {
		console.log('searchClickHandler');
		try {
			setLoading(true);

			setWallet('');
			setToastVisible(true);

			const validAddress = validateAddress(inputRef.current?.value || '');
			if (!validAddress) {
				setLoading(false);
				return;
			}

			// const hello = await fetcher('/api/hello');

			// const proxyData = await fetcher(
			// 	`/api/proxy?address=${inputRef.current?.value}`
			// );

			// console.log('proxyData', proxyData);

			// const data = await fetcher(`/api/proxy?address=${inputRef.current?.value}`);
			const data = await fetcher(
				`${API_URL}/wallet/transaction/history?address=${inputRef.current?.value}&time_range=${timeRange}&type=${searchType}
			`
			);

			console.log('histories', histories);

			// TODO: balance hasn't done yet
			// FIXME: There's error calling http API request
			const balanceData = await fetcher(
				`${API_URL}/wallet/balance?address=${inputRef.current?.value}`
			);

			console.log('balance', balanceData);

			// TODO: validate the address
			if (inputRef.current?.value) {
				if (data?.message === 'OK') {
					console.log('wallet from Zustand in index', wallet);

					const walletTitle =
						inputRef.current?.value.slice(0, 4) +
						'...' +
						inputRef.current?.value.slice(-5);
					const now = getTimestamp();

					setHistories([
						{
							walletTitle: walletTitle,
							walletContent: inputRef.current?.value,
							searchAt: now,
						},
					]);
					setWalletHistories(data.result);
					setWallet(inputRef.current.value);
				} else {
					setWalletHistories([]);
				}
			}

			if (balanceData?.message === 'OK') {
				console.log(
					'balanceData',
					balanceData,
					'balanceData.result',
					balanceData.result
				);

				const eth = weiToEth(balanceData.result);
				setBalance(eth);
			}
		} catch (error) {
			console.log('error', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="">
			<Sidebar />
			<div className="py-5 px-10 w-[500px] z-20">
				<Link href="#">
					<Image
						className="hover:opacity-80 transition-all duration-300"
						src="/elements/crypto_sleuth.svg"
						alt="logo"
						width={208}
						height={10}
					/>
				</Link>
			</div>

			{/* <InfoModal visible={visible} btnClickHandler={btnClickHandler} /> */}
			{/* {wallet && <Toast visible={toastVisible} btnClickHandler={btnClickHandler} />} */}
			{/* <Toast visible={toastVisible} btnClickHandler={btnClickHandler} /> */}

			<div className="w-full h-[400px] bg-[url('/elements/banner.svg')]">
				<div className="flex flex-col justify-start space-y-6 items-center bg-cover bg-center container">
					<div className="text-white text-[40px] fold-bold mt-10">
						The Ethereum Blockchain Explorer{' '}
					</div>

					<div className="text-white text-xl my-2 text-center">
						After searching for the address and applying filtering restrictions, you
						can view the flow of funds and further account information from the
						bottom sphere.
					</div>

					<div className="flex justify-between space-x-[5rem] w-full">
						<input
							disabled={loading}
							ref={inputRef}
							placeholder="Search by Address"
							type="text"
							className="text-white text-[20px] tracking-wider px-8 bg-white/50 h-[50px] w-full rounded-xl focus:outline-none placeholder:text-white disabled:text-slate-500"
						/>

						<button
							disabled={loading}
							// onClick={searchClickHandler}
							onClick={btnClickHandler}
							className="w-[150px] flex justify-center items-center px-10 py-2 border-white border-[3px] bg-transparent rounded-xl text-[20px] text-white hover:text-primary-500 hover:bg-white transition-all duration-300 disabled:text-primary-500 disabled:bg-white"
						>
							{loading ? (
								<div role="status">
									<svg
										aria-hidden="true"
										className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							) : (
								`Search`
							)}
						</button>
					</div>

					<div className="w-full flex justify-start mt-20 space-x-5">
						<Dropdown
							title="Select time"
							items={['1 minute', '5 minutes', '30 minutes', '1 hour']}
							getActiveItem={getTimeRange}
						/>

						<Dropdown
							title="Select variable"
							items={['Highest amount', 'Most frequently']}
							getActiveItem={getFilterType}
						/>
					</div>
				</div>
			</div>

			{/* ---Card--- */}

			<div className="flex justify-center mt-16 container">
				<div
					className="bg-white rounded-3xl mx-0 p-10 min-h-40 w-full"
					style={{boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)'}}
				>
					<div className="text-[32px] font-bold">
						{wallet ? wallet : DEFAULT_WALLET}
					</div>
					<div className="flex space-x-3">
						<div className="">
							{wallet ? wallet : DEFAULT_WALLET}
							{/* {targetAddress} */}
						</div>
						<div className="">
							<Image
								className="hover:cursor-pointer"
								src="elements/copy_icon.svg"
								alt="icon"
								width={24}
								height={24}
							/>
						</div>
					</div>

					<div className="flex space-x-10 mt-10 w-2/3">
						<div className="">
							<div className="text-gray-600">ETH BALANCE</div>

							<div className="flex space-x-1 mt-2">
								<div className="min-w-[32px]">
									<Image
										className="hover:cursor-pointer"
										src="elements/eth.svg"
										alt="icon"
										width={32}
										height={32}
									/>
								</div>{' '}
								<div className="font-bold text-lg lg:text-2xl">
									{balance ? balance : 7.2} ETH
								</div>
							</div>
						</div>

						<div className="">
							<div className="text-gray-600">ETH VALUE</div>
							<div className="font-bold text-lg lg:text-2xl mt-2">$7,036,330.26</div>
						</div>
					</div>
				</div>
			</div>

			{/* ---Card--- */}

			{/* ---Ball Section--- */}
			<div className="mt-16 container">
				<div className="flex justify-center">
					{/* 轉出的球 */}
					<div className="-mr-[10rem] z-20">
						<CashOutBall
							w={w}
							h={h}
							title={DEFAULT_WALLET_1}
							content={DEFAULT_WALLET_1}
							remark="- 0.55 ETH / $19,463 "
						/>
					</div>

					<div className="mt-[12rem] w-[31.25rem] z-10">
						{' '}
						<CenterBall
							title={wallet ? wallet : DEFAULT_WALLET}
							content={wallet ? wallet : DEFAULT_WALLET}
						/>
					</div>

					{/* 轉入的球 */}
					<div className="ml-[0rem] mt-[8rem] z-0">
						<CashInBall
							w={`w-[15rem]`}
							h={`h-[15rem]`}
							title={DEFAULT_WALLET_2}
							content={DEFAULT_WALLET_2}
							remark="+ 0.55 ETH / $19,463 "
						/>
					</div>

					{/* 轉出的球 */}
					<div className="-ml-[15rem] mt-[30rem] z-20">
						<CashOutBall1
							w={`w-[16rem]`}
							h={`h-[16rem]`}
							title={DEFAULT_WALLET_1}
							content={DEFAULT_WALLET_1}
							remark="- 0.55 ETH / $19,463 "
						/>
					</div>

					{/* 轉入的球 */}
					<div className="-ml-[58rem] mt-[32rem] z-0">
						<CashInBall
							w={`w-[12rem]`}
							h={`h-[12rem]`}
							title={DEFAULT_WALLET_1}
							content={DEFAULT_WALLET_1}
							remark="+ 0.12 ETH / $1,463 "
						/>
					</div>

					{/* 轉出的球 */}
					<div className="ml-[10rem] mt-[45rem] z-20">
						<CashOutBall1
							w={`w-[16rem]`}
							h={`h-[16rem]`}
							title={DEFAULT_WALLET_1}
							content={DEFAULT_WALLET_1}
							remark="+ 0.55 ETH / $19,463 "
						/>
					</div>
				</div>

				{/* {walletHistories.map((history, index) => {
					return (
						<div
							key={index}
							className={`bg-white w-[500px] h-[500px] border-2 border-blue text-center flex-col flex items-center justify-center
					} rounded-full opacity-100 cursor-pointer duration-500 shadow-2xl`}
						>
							<div className="">
								from: <span className="text-blue-800">{history.from}</span>
							</div>
							<div className="">
								to: <span className="text-blue-800">{history.to}</span>
							</div>
							<div className="">
								value: <span className="text-blue-800">{history.value}</span>
							</div>
							<div className="">
								function:{' '}
								<span className="text-blue-800">{history.functionName}</span>
							</div>
						</div>
					);
				})} */}
				{/* <button
					className={`bg-white w-[500px] h-[500px] border-2 border-blue text-center flex-col flex items-center justify-center
					} rounded-full opacity-100 cursor-pointer duration-500 shadow-2xl`}
				>
					<div className="">iven.eth</div>
					<div className="">{walletHistories[0]?.to}</div>
				</button>{' '} */}
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
			</div>

			{/* ---Ball Section--- */}
			{/* ---History Section--- */}
			<div className="mt-20 h-[600px] container justify-start">
				<div className="text-primary-900 text-2xl font-bold">Search history</div>
				<div className="text-gray-750 text-xs mt-3 mb-20">
					Displays the latest four query records. For more detailed records, please
					see the menu on the right.
				</div>
				<div className="flex space-x-2 items-center">
					<CashOutBall2
						w={`w-[12rem]`}
						h={`h-[12rem]`}
						title={DEFAULT_WALLET_1}
						content={DEFAULT_WALLET_1}
						remark="+ 0.55 ETH / $19,463 "
					/>
					<div className="w-10 h-px bg-primary-900"></div>
					<CashOutBall2
						w={`w-[12rem]`}
						h={`h-[12rem]`}
						title={DEFAULT_WALLET_1}
						content={DEFAULT_WALLET_1}
						remark="+ 0.55 ETH / $19,463 "
					/>
					<div className="w-10 h-px bg-primary-900"></div>
					<CashOutBall2
						w={`w-[12rem]`}
						h={`h-[12rem]`}
						title={DEFAULT_WALLET_1}
						content={DEFAULT_WALLET_1}
						remark="+ 0.55 ETH / $19,463 "
					/>

					<div className="w-10 h-px bg-primary-900"></div>

					<CashOutBall2
						w={`w-[12rem]`}
						h={`h-[12rem]`}
						title={DEFAULT_WALLET_1}
						content={DEFAULT_WALLET_1}
						remark="+ 0.55 ETH / $19,463 "
					/>

					<div className="flex items-center pr-10">
						<div className="w-10 h-px bg-primary-900"></div>
						<svg
							width="6"
							height="6"
							viewBox="0 0 10 10"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polygon points="0,0 10,5 0,10" fill="#184B98" />
						</svg>{' '}
					</div>
					<CashInBall
						w={`w-[12rem]`}
						h={`h-[12rem]`}
						title={DEFAULT_WALLET_2}
						content={DEFAULT_WALLET_2}
						// remark="+ 0.55 ETH / $19,463 "
					/>
				</div>
			</div>
			{/* Footer */}

			{/* <div className="bg-[#C1C1C1] h-[600px] mt-40"></div> */}
		</div>
	);
};

export default Showcase;
