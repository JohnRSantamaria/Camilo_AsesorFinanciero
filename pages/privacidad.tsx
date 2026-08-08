import Head from 'next/head';
import Link from 'next/link';
import {Raleway} from 'next/font/google';
import Footer from '@/components/Footer';
import NavbarMenu from '@/components/NavbarMenu';
import MobileNabBarMenu from '@/components/MobileNabBarMenu';
import Layout from '@/components/Layout';
import {openCookiePreferences} from '@/lib/consent';
import {Button} from '@/components/ui/button';

const raleway = Raleway({subsets: ['latin']});

export default function PrivacidadPage() {
	return (
		<>
			<Head>
				<title>Política de privacidad — Camilo Meza</title>
				<meta
					name='description'
					content='Política de privacidad y cookies de Camilo Meza Asesoría Financiera'
				/>
			</Head>
			<main
				className={`flex min-h-screen flex-col bg-light dark:bg-dark ${raleway.className}`}
			>
				<Layout className='relative flex flex-col gap-2 w-full'>
					<NavbarMenu />
					<MobileNabBarMenu />
					<article className='px-4 py-8 max-w-3xl mx-auto w-full prose-editor'>
						<p className='text-sm rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 mb-8 text-foreground'>
							<strong>Nota:</strong> este texto es orientativo para el sitio web y está{' '}
							<strong>pendiente de revisión legal</strong>. No constituye asesoría jurídica.
						</p>

						<h1 className='text-3xl md:text-4xl font-bold text-primary mb-6'>
							Política de privacidad y cookies
						</h1>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>1. Responsable</h2>
							<p>
								El responsable del tratamiento de los datos relacionados con este sitio web es{' '}
								<strong>Camilo Meza</strong>, asesor financiero, con contacto en{' '}
								<a
									href='mailto:asesorfinanciero@camilomeza.com'
									className='text-primary underline'
								>
									asesorfinanciero@camilomeza.com
								</a>
								. El sitio está dirigido principalmente a usuarios en Colombia.
							</p>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>2. Finalidad</h2>
							<p>Tratamos información con estas finalidades:</p>
							<ul className='list-disc pl-5 space-y-1'>
								<li>
									<strong>Analítica web (Google Analytics 4):</strong> solo si aceptas
									cookies de analítica, para medir visitas a páginas (incluido el blog),
									eventos de contacto (WhatsApp, Instagram, email) y el uso general del
									sitio, con el fin de mejorar el contenido y el servicio.
								</li>
								<li>
									<strong>Funcionamiento técnico:</strong> cookies o almacenamiento
									necesarios para el panel de administración (inicio de sesión), cuando
									corresponda.
								</li>
								<li>
									<strong>Contacto:</strong> si nos escribes por email, WhatsApp u otras
									vías externas, el tratamiento se rige por esas plataformas y por la
									relación directa contigo.
								</li>
							</ul>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>
								3. Datos que puede recoger Google Analytics
							</h2>
							<p>Si das tu consentimiento, GA4 puede registrar, entre otros:</p>
							<ul className='list-disc pl-5 space-y-1'>
								<li>Páginas visitadas y rutas (por ejemplo `/blog` o un artículo)</li>
								<li>Eventos de interacción (clics en Blog, WhatsApp, Instagram, email, CTA)</li>
								<li>Información técnica del dispositivo y navegador</li>
								<li>
									Ubicación aproximada (país y, si está habilitado en GA4, ciudad)
								</li>
							</ul>
							<p>
								No enviamos a Analytics tu nombre, correo ni datos de formularios de
								contacto. No usamos Google signals ni personalización de anuncios en la
								configuración prevista de esta propiedad.
							</p>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>4. Cookies</h2>
							<ul className='list-disc pl-5 space-y-1'>
								<li>
									<strong>Técnicas / esenciales:</strong> necesarias para el
									funcionamiento del sitio o del acceso administrativo (por ejemplo
									sesión en Supabase Auth). No requieren consentimiento de analítica.
								</li>
								<li>
									<strong>Analíticas:</strong> cookies o identificadores de Google
									Analytics, solo tras tu aceptación explícita en el banner.
								</li>
								<li>
									<strong>Preferencia de consentimiento:</strong> guardamos tu elección
									(aceptar/rechazar) en el almacenamiento local del navegador (
									<code>cookie_consent</code>).
								</li>
							</ul>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>
								5. Base y consentimiento
							</h2>
							<p>
								La medición con Google Analytics se activa únicamente cuando aceptas en el
								banner de cookies. Puedes rechazar sin que ello impida navegar el sitio
								público. En Colombia aplican, entre otras, las normas de protección de
								datos personales (Ley 1581 de 2012 y normas complementarias).
							</p>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>6. Encargados / terceros</h2>
							<p>
								Google LLC (Google Analytics) puede tratar datos técnicos de navegación
								según su propia política, cuando hayas consentido la analítica. El
								alojamiento y autenticación del CMS pueden involucrar a proveedores como
								Supabase.
							</p>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>
								7. Derechos (Ley 1581)
							</h2>
							<p>
								Puedes solicitar conocer, actualizar, rectificar o suprimir datos
								personales que te conciernan, y ejercer los demás derechos que
								corresponden ante el responsable, escribiendo a{' '}
								<a
									href='mailto:asesorfinanciero@camilomeza.com'
									className='text-primary underline'
								>
									asesorfinanciero@camilomeza.com
								</a>
								.
							</p>
						</section>

						<section className='space-y-3 mb-8 text-gray-800 dark:text-gray-200'>
							<h2 className='text-xl font-semibold text-primary'>
								8. Retirar o cambiar el consentimiento
							</h2>
							<p>
								Puedes cambiar tu decisión de cookies en cualquier momento. Al hacerlo se
								volverá a mostrar el banner:
							</p>
							<Button
								type='button'
								variant='outline'
								className='mt-2'
								onClick={() => openCookiePreferences()}
							>
								Preferencias de cookies
							</Button>
						</section>

						<p className='text-sm text-muted-foreground mb-8'>
							Última actualización orientativa: agosto 2026.
						</p>

						<Link
							href='/'
							className='text-sm text-primary hover:underline'
						>
							← Volver al inicio
						</Link>
					</article>
				</Layout>
				<Footer />
			</main>
		</>
	);
}
