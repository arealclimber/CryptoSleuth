import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Barlow&family=Caveat&family=Comfortaa&family=Dancing+Script&family=Dosis:wght@300&family=Edu+QLD+Beginner:wght@500&family=Gloria+Hallelujah&family=M+PLUS+Rounded+1c:wght@300;500&family=Maven+Pro&family=Nunito:wght@200;400&family=PT+Sans&family=Press+Start+2P&family=Quicksand&family=Roboto&family=Rubik&family=Zilla+Slab&display=swap"
						rel="stylesheet"
					/>{' '}
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
