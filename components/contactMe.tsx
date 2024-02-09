import React, {use, useEffect, useState} from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import SectionsLayout from './SectionsLayout';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {errorAlert, successAlert} from '@/utils/swal';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';

function FormContacMe() {
	const router = useRouter();
	const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
		try {
			setSubmitting(true);
			const response = await fetch('/api/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			const data = await response.json();

			if (data === 'ok') {
				const date = new Date();
				date.setTime(date.getTime() + 30 * 60 * 1000);
				Cookies.set('formSubmitted', 'true', {expires: date});
				router.reload();
				await successAlert(
					'Mensaje enviado',
					'Gracias por contactarme, te responderé lo antes posible'
				);
			} else {
				await errorAlert('Error al enviar el mensaje', data.message);
			}
		} catch (error: any) {
			await errorAlert('Error al enviar el mensaje', error.message);
		} finally {
			setSubmitting(false);
			resetForm();
		}
	};

	return (
		<Formik
			initialValues={{
				name: '',
				cellPhone: '',
				email: '',
				subject: 'Contacto desde el sitio web',
				message: '',
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string().required('Nombre es requerido').max(50, 'Nombre muy largo'),
				email: Yup.string()
					.email('Correo invalido')
					.required('Correo es requerido')
					.max(50, 'Correo muy largo'),
				cellPhone: Yup.string()
					.max(10, 'Celular muy largo')
					.matches(/^[0-9]*$/, 'Solo números')
					.matches(/^[0-9]{10}$/, 'Celular invalido'),
				subject: Yup.string().required('Asunto es requerido').max(50, 'Asunto muy largo'),
				message: Yup.string().required('Mensaje es requerido').max(500, 'Mensaje muy largo'),
			})}
			onSubmit={handleSubmit}
		>
			{() => (
				<Form className='flex flex-col items-start justify-evenly w-full p-2 rounded-lg bg-stone-200 dark:bg-zinc-800'>
					<label
						htmlFor='name'
						className='mt-4'
					>
						Nombre:
					</label>
					<Field
						name='name'
						type='text'
						className='w-full p-2  rounded-lg bg-light dark:bg-dark focus:outline-none focus:ring-1 focus:ring-primary'
						autoComplete='off'
						maxLength={51}
					/>
					<ErrorMessage
						name='name'
						component='div'
						className='text-red-800'
					/>
					<div className='flex flex-col lg:flex-row justify-evenly gap-4 w-full'>
						<div className='w-full'>
							<label htmlFor='cellPhone'>Celular</label>
							<Field
								name='cellPhone'
								type='text'
								className='w-full p-2  rounded-lg bg-light dark:bg-dark focus:outline-none focus:ring-1 focus:ring-primary'
								autoComplete='off'
								maxLength={10}
							/>
							<ErrorMessage
								name='cellPhone'
								component='div'
								className='text-red-800'
							/>
						</div>
						<div className='w-full'>
							<label htmlFor='email'>Correo:</label>
							<Field
								name='email'
								type='email'
								className='w-full p-2 rounded-lg bg-light dark:bg-dark focus:outline-none focus:ring-1 focus:ring-primary'
								autoComplete='off'
								maxLength={50}
							/>
							<ErrorMessage
								name='email'
								component='div'
								className='text-red-800'
							/>
						</div>
					</div>
					<div className='w-full  mt-2 py-2'>
						<label htmlFor='subject'>Asunto:</label>
						<Field
							name='subject'
							type='text'
							className='w-full p-2 rounded-lg bg-light dark:bg-dark focus:outline-none focus:ring-1 focus:ring-primary'
							autoComplete='off'
							maxLength={51}
						/>
						<ErrorMessage
							name='subject'
							component='div'
							className='text-red-800'
						/>
						<label htmlFor='message'>Mensaje:</label>
						<Field
							name='message'
							as='textarea'
							className='w-full p-2  rounded-lg bg-light dark:bg-dark focus:outline-none focus:ring-1 focus:ring-primary'
							autoComplete='off'
							maxLength={500}
						/>
						<ErrorMessage
							name='message'
							component='div'
							className='text-red-800'
						/>
					</div>
					<button
						type='submit'
						className='bg-primary text-white w-full p-2 rounded-xl mt-8 mb-4'
					>
						Enviar
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default function ContactMe() {
	// Verificar si el formulario ya ha sido enviado
	const formSubmitted = Cookies.get('formSubmitted');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useEffect(() => {
		if (formSubmitted === undefined) return;

		if (formSubmitted === 'true') {
			setIsFormSubmitted(true);
		} else {
			setIsFormSubmitted(false);
		}
	}, [formSubmitted]);

	return (
		<SectionsLayout
			className='flex gap-4 items-start !min-h-fit pb-12'
			id='contacto'
		>
			<AnimatedText text='Contactame' />
			{isFormSubmitted ? (
				<div className='flex flex-col items-center justify-center w-full  '>
					<div className='w-full bg-stone-200 dark:bg-zinc-800 rounded-lg p-4 text-center'>
						<h3 className='text-2xl lg:text-4xl mb-8'>Mensaje enviado</h3>
						<p className='mb-4 lg:text-2xl'>
							Gracias por contactarme, te responderé lo antes posible.
						</p>
					</div>
				</div>
			) : (
				<section className='flex flex-col gap-4 justify-start lg:justify-evenly w-full h-full pb-20'>
					<h3 className='text-2xl lg:text-4xl'>Envíame un mensaje</h3>
					<p className='lg:text-2xl'>Si tienes alguna duda o solicitud, por favor házmelo saber.</p>
					<FormContacMe />
				</section>
			)}
		</SectionsLayout>
	);
}
