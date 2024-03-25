import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
	return (
		<Html lang='es'>
			<Head>
				<meta
					property='og:title'
					content='Camilo Meza | Asesor Financiero'
				/>
				<meta
					property='og:description'
					content='Asesor Financiero'
				/>
				<meta
					property='og:url'
					content='https://camilomeza.com'
				/>
				<meta
					property='og:image'
					content='/public/Image/financial_advisor.jpg'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
