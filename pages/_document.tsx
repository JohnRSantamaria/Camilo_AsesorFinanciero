import {Html, Head, Main, NextScript} from 'next/document';
import {DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL} from '@/lib/seo';

export default function Document() {
	return (
		<Html lang='es'>
			<Head>
				<meta
					property='og:site_name'
					content={SITE_NAME}
				/>
				<meta
					property='og:title'
					content='Camilo Meza | Asesor Financiero'
				/>
				<meta
					property='og:description'
					content={DEFAULT_DESCRIPTION}
				/>
				<meta
					property='og:url'
					content={SITE_URL}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:image'
					content={DEFAULT_OG_IMAGE}
				/>
				<meta
					property='og:locale'
					content='es_CO'
				/>

				<meta
					name='description'
					content={DEFAULT_DESCRIPTION}
				/>
				<meta
					name='author'
					content='Camilo Meza'
				/>
				<meta
					name='robots'
					content='index, follow'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
