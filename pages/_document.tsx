import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
	return (
		<Html lang='es'>
			<Head>
				<meta
					property='og:title'
					content='Camilo Menza | Asesor Financiero'
				/>
				<meta
					property='og:description'
					content='Asesor Financiero'
				/>
				<meta
					property='og:image'
					content='/public/favicon.ico '
				/>
				<meta
					property='og:url'
					content='https://camilomenza.com'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
