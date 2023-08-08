import '@/styles/globals.css';
import '@/styles/custom.css';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
	return (
		<div className="font-roboto">
			<Component {...pageProps} />
		</div>
	);
}
