import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

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

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        try {
            // Definir la ruta absoluta de la imagen
            const imagePath = path.join(__dirname, 'images', 'logo.jpg');

            // Configuración del correo con HTML
            const mailOptions: any = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                html: `
                    <div style="text-align: center;">
                        <h1>Bienvenido a WellSync</h1>
                        <p>Gracias por unirte a nosotros, esperamos que disfrutes de nuestros servicios.</p>
                        <img src="cid:logo_cid" alt="Logo de WellSync" style="max-width: 300px;" />
                    </div>
                `,
                attachments: [
                    {
                        filename: 'logo.jpg', // El nombre del archivo que aparece en el correo
                        path: imagePath, // Ruta absoluta a la imagen
                        cid: 'logo_cid', // Esto permite usar la imagen en el HTML
                    },
                ],
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




/*import nodemailer from 'nodemailer';
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

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
            });
            console.log(`Correo enviado a ${to}`);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new Error('No se pudo enviar el correo.');
        }
    }
}

*/