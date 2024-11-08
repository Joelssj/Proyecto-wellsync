import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class EmailAdapter {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '465', 10),
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASSWORD, 
            },
        });
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {  // Cambié el parámetro "text" a "html"
        try {
            const mailOptions: any = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                html,
            };

            // Enviar correo
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a ${to}`);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new Error('No se pudo enviar el correo.');
        }
    }
}


