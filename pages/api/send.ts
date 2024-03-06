import type {NextApiRequest, NextApiResponse} from 'next';
import {EmailTemplate} from '@/components/email/emailTemplate';
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const {name, cellPhone, email, subject, message} = req.body;

	const {error} = await resend.emails.send({
		from: 'asesorfinanciero@camilomeza.com',
		to: ['asesorfinanciero@camilomeza.com'],
		subject: subject,
		text: message,
		react: EmailTemplate({firstName: name, cellPhone, email, subject, message}),
	});

	if (error) {
		return res.status(400).json(error);
	}

	res.status(200).json('ok');
}
