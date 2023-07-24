import {useEffect, useState} from 'react';
import {ITransaction, ITransactionHistory} from '../interfaces/transactions';
import Ball from '../components/Ball';
import {wait} from '../utils/common';

const API = `/api/wallet/transactions/history`;

export default function Home() {
	const [walletAddress, setWalletAddress] = useState<string>('');
	const [data, setData] = useState<ITransactionHistory | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

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

	return (
		<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
			<div className="z-10 w-full max-w-5xl items-center justify-between text-sm flex-col">
				<p className="text-5xl">Crypto Sleuth</p>
				<div className="mt-10 flex space-x-10">
					<input
						value={walletAddress}
						onChange={e => setWalletAddress(e.target.value)}
						className="w-full h-10 px-3 py-2 disabled:bg-slate-300 text-base disabled:text-black text-black placeholder-gray-400 border rounded-lg focus:shadow-outline focus:outline-none"
						placeholder="A wallet address on the ETH"
						disabled={loading}
					/>{' '}
					<button
						disabled={loading}
						onClick={btnClickHandler}
						className="disabled:bg-blue-900 text-lg w-[150px] hover:text-white text-black bg-blue-400 rounded-lg hover:bg-blue-600 transition-all duration-300"
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

				<div className="mt-10 text-lg">
					{!loading && data ? (
						<>
							<div
								className={`${`bg-blue-200 rounded-md`} p-5 max-w-[550px] truncate text-black`}
							>
								{data?.wallet ? `Wallet: ${data?.wallet}` : ``}
							</div>

							<div className="mt-10 flex flex-col text-lg space-y-10">
								{data.transactions.map((t, index) => {
									return (
										<div
											key={t.txhash}
											className="flex space-x-10 border-blue-300 p-5 rounded-lg border-2"
										>
											<div className="">{index + 1}.</div>
											<div className="flex flex-col">
												<p className="">Txhash: {t.txhash}</p>
												<p className="">From: {t.from}</p>
												<p className="">To: {t.to} </p>
												<p className="">Value: {t.value}</p>
											</div>
											<div className=""> {/* <Ball content={t.value} /> */}</div>
										</div>
									);
								})}
							</div>
						</>
					) : null}
				</div>
				<div></div>
			</div>
		</main>
	);
}
