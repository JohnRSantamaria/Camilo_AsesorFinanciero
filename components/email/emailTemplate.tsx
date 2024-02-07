import * as React from 'react';

interface EmailTemplateProps {
	firstName: string;
	cellPhone: string;
	email: string;
	subject: string;
	message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	cellPhone,
	email,
	subject,
	message,
}) => (
	<div className='flex flex-col p-4 gap-4 border h-fit'>
		<h1>Te escribio, {firstName}!</h1>

		<p>
			<strong>Telefono:</strong> {cellPhone}
		</p>

		<p>
			<strong>Email:</strong> {email}
		</p>

		<p>
			<strong>Asunto:</strong> {subject}
		</p>
		<p>
			<strong>Mensage:</strong> {message}
		</p>
	</div>
);
