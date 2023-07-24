import '@/styles/globals.css';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
	return (
		<div className="font-nunito">
			<Component {...pageProps} />
		</div>
	);
}
