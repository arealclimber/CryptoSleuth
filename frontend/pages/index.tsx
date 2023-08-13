/**
 * TODO:
 * 0. Layout: Ball, History
 * 1. Scroll bar decoration
 * 2. Call API and render data (Wallet balance, History)
 * 3. Wrap the result of API in Zustand
 *
 */
import Image from 'next/image';
import Link from 'next/link';
import React, {useRef, useState} from 'react';
import {ITransaction} from '../interfaces/transactions';

const Home = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [targetAddress, setTargetAddress] = useState<string>('');
	const [walletHistories, setWalletHistories] = useState(Array<ITransaction>);
	const [loading, setLoading] = useState<boolean>(false);
	// TODO: get the balance of targeted address

	const fetcher = async (...args: Parameters<typeof fetch>): Promise<any> => {
		const res = await fetch(...args)
			.then(res => res.json())
			.catch(err => {
				console.error('error', err);
			});

		console.log('res', res);
		return res;
	};

	const searchClickHandler = async () => {
		setLoading(true);

		const data = await fetcher(`/api/proxy?address=${inputRef.current?.value}`);

		// TODO: validate the address
		if (inputRef.current?.value) {
			if (data?.message === 'OK') {
				setTargetAddress(inputRef.current.value);
				setWalletHistories(data.result);
			} else {
				setTargetAddress(inputRef.current.value);
				setWalletHistories([]);
			}
		}

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="">
			<div className="py-5 px-10 w-[500px]">
				<Link href="/">
					<Image
						className="hover:opacity-80 transition-all duration-300"
						src="/elements/crypto_sleuth.svg"
						alt="logo"
						width={208}
						height={10}
					/>
				</Link>
			</div>
			{/* <div className="">
				<Image
					src="/elements/banner.svg"
					alt="banner"
					width={0}
					height={0}
					sizes="100vw"
					style={{width: '100%', height: 'auto'}}
				/>
			</div> */}

			{/* <div
				style={{
					backgroundImage: `url('/elements/banner.svg')`,
					objectFit: 'contain',
					// backgroundSize: `${WIDTH_OF_SHARING_RECORD}px ${HEIGHT_OF_SHARING_RECORD}px`,
					backgroundPosition: 'relative',
					backgroundRepeat: 'no-repeat',

					display: 'flex',
					// flexDirection: 'column',
					// alignItems: 'flex-start',
					// justifyContent: 'flex-center',
					height: '100vh',
					width: '100vw',

					// height: `${HEIGHT_OF_SHARING_RECORD}px`,
					// width: `${WIDTH_OF_SHARING_RECORD}px`,
				}}
			></div> */}
			<div className="flex flex-col justify-start space-y-6 items-center bg-cover bg-center w-screen h-[400px] bg-[url('/elements/banner.svg')]">
				<div className="text-white text-[40px] fold-bold mt-16">
					Lorem ipsum dolor sit amet consectetur.{' '}
				</div>
				<div className="flex justify-center space-x-10 w-full">
					<input
						disabled={loading}
						ref={inputRef}
						placeholder="Search by Address"
						type="text"
						className="text-black text-[20px] tracking-wider px-8 bg-white/50 h-[50px] w-2/3 xl:max-w-[936px] rounded-3xl focus:outline-none placeholder:text-white disabled:text-slate-500"
					/>

					<button
						disabled={loading}
						onClick={searchClickHandler}
						className="w-[150px] flex justify-center px-10 py-2 border-white border-[3px] bg-transparent rounded-3xl text-[20px] text-white hover:text-black hover:border-black transition-all duration-300 disabled:text-black disabled:border-black"
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
			</div>

			{/* ---Card--- */}
			<div className="flex justify-center mt-12 w-full">
				<div
					className="bg-white rounded-3xl mx-10 p-10 min-h-40 w-4/5 xl:max-w-[1128px] -mt-40"
					style={{boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)'}}
				>
					<div className="text-[32px] font-bold">iven.eth</div>
					<div className="flex space-x-3">
						<div className="">{targetAddress}</div>
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
									3,844.653070438940336094 ETH
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

			{/* <div className='mx-10'></div> */}

			<div className="container w-1/2 lg:w-[1128px] hidden lg:flex justify-start space-x-5 mt-10 flex-nowrap">
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
			</div>
			{/* ---Ball Section--- */}
			<div className="container w-2/3 mt-40">
				{walletHistories.map((history, index) => {
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
				})}
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
			<div className=""></div>

			{/* Footer */}
			<div className="bg-gray-700 h-[600px] mt-40"></div>
		</div>
	);
};

export default Home;
