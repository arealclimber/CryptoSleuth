import '@/styles/globals.css';
import '@/styles/custom.css';
import type {AppProps} from 'next/app';
import Toast from '../components/Toast';
import useGlobalStore from '../store/basic';

export default function App({Component, pageProps}: AppProps) {
	const [toastVisible, setToastVisible] = useGlobalStore(s => [
		s.visibleToast,
		s.setVisibleToast,
	]);
	return (
		<div className="font-roboto">
			<Toast
				visible={toastVisible}
				btnClickHandler={() => {
					setToastVisible(!toastVisible);
				}}
			/>
			<Component {...pageProps} />
		</div>
	);
}
