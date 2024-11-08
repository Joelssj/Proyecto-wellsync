import { PasswordResetRepository } from "../domain/PasswordResetRepository";
import { PasswordReset } from "../domain/PasswordReset";
import { EmailAdapter } from "../infraestructure/adapter/EmailPasswordAdapter";
import { UsersRepository } from "../../User/domain/UsersRepository";

export class CreatePasswordResetUseCase {
    constructor(
        private readonly passwordResetRepository: PasswordResetRepository,
        private readonly usersRepository: UsersRepository,
        private readonly emailAdapter: EmailAdapter
    ) {}

    async run(email: string): Promise<void> {
        // Verificar si el correo existe en la base de datos de usuarios
        const user = await this.usersRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("No se encontró ningún usuario con ese correo.");
        }

        // Generar un token de 4 dígitos y guardarlo
        const token = Math.floor(1000 + Math.random() * 9000); // Generar token de 4 dígitos
        const expiresAt = new Date(Date.now() + 3600000); // Expira en 1 hora
        const passwordReset = new PasswordReset(email, token.toString(), new Date(), expiresAt);
        await this.passwordResetRepository.savePasswordReset(passwordReset);

        // Enviar el token por correo con un diseño atractivo
        await this.emailAdapter.sendEmail(
            email,
            'Recuperación de contraseña',
            `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #F4F4F4;">
                <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333333; font-size: 24px;">Recuperación de contraseña</h1>
                    <p style="font-size: 16px; color: #555555;">Hola, hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código para continuar:</p>
                    <div style="margin: 20px 0;">
                        <span style="font-size: 36px; font-weight: bold; color: #4CAF50;">${token}</span>
                    </div>
                    <p style="font-size: 14px; color: #777777;">Este código expirará en 1 hora.</p>
                    <p style="font-size: 14px; color: #777777;">Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
                    <p style="font-size: 14px; color: #777777;">Gracias,</p>
                    <p style="font-size: 14px; color: #777777;">El equipo de WellSync</p>
                </div>
            </div>
            `
        );
    }
}

