import type {NextApiRequest, NextApiResponse} from 'next';
import {ITransactionHistory} from '../../../../../interfaces/transactions';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ITransactionHistory | {}>
) {
	const {wallet} = req.query;

	if (!wallet) {
		return res.status(400).json({error: 'Missing wallet address'});
	}

	res.status(200).json({
		wallet: wallet,
		transactions: [
			{
				txhash: '0x1234567890',
				block: 123456,
				timestamp: 1234567890,
				from: '0x1234567890',
				to: '0x1234567890',
				value: +(Math.random() * 1000).toFixed(2),
				fee: 1234567890,
				status: 'pending',
			},
			{
				txhash: '0x1234567890',
				block: 123456,
				timestamp: 1234567890,
				from: '0x1234567890',
				to: '0x1234567890',
				value: +(Math.random() * 1000).toFixed(2),
				fee: 1234567890,
				status: 'pending',
			},
			{
				txhash: '0x1234567890',
				block: 123456,
				timestamp: 1234567890,
				from: '0x1234567890',
				to: '0x1234567890',
				value: +(Math.random() * 1000).toFixed(2),
				fee: 1234567890,
				status: 'pending',
			},
			{
				txhash: '0x1234567890',
				block: 123456,
				timestamp: 1234567890,
				from: '0x1234567890',
				to: '0x1234567890',
				value: +(Math.random() * 1000).toFixed(2),
				fee: 1234567890,
				status: 'pending',
			},
			{
				txhash: '0x1234567890',
				block: 123456,
				timestamp: 1234567890,
				from: '0x1234567890',
				to: '0x1234567890',
				value: +(Math.random() * 1000).toFixed(2),
				fee: 1234567890,
				status: 'pending',
			},
		],
	});
}
