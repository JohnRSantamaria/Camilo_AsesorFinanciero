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
					content='/public/favicon.ico'
				/>
				<meta
					property='og:type'
					content='website'
				/>

				<meta
					name='description'
					content='Asesor Financiero'
				/>

				<meta
					name='keywords'
					content='Asesor Financiero, Asesor, Financiero'
				/>

				<meta
					name='author'
					content='https://www.linkedin.com/in/john-santamaria-dev/'
				/>

				<meta
					name='robots'
					content='index, follow'
				/>

				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>

				<meta
					name='image'
					content='/public/favicon.ico'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
