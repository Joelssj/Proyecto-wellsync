import { PasswordResetRepository } from "../domain/PasswordResetRepository";
import { UsersRepository } from "../../User/domain/UsersRepository";
import bcrypt from "bcrypt";

export class ResetPasswordUseCase {
    constructor(
        private readonly passwordResetRepository: PasswordResetRepository,
        private readonly usersRepository: UsersRepository
    ) {}

    async run(token: string, newPassword: string, confirmPassword: string): Promise<void> {
        // Verificar si las contraseñas coinciden
        if (newPassword !== confirmPassword) {
            throw new Error("Las contraseñas no coinciden.");
        }

        // Buscar el token en la base de datos
        const passwordReset = await this.passwordResetRepository.getPasswordResetByToken(token);
        if (!passwordReset) {
            throw new Error("Token inválido o expirado.");
        }

        // Obtener el correo desde el resultado del token
        const { correo } = passwordReset;

        // Buscar el usuario con el correo en la tabla users
        const user = await this.usersRepository.getUserByEmail(correo);
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        user.password = hashedPassword;
        await this.usersRepository.updateUser(user);

        // Eliminar el registro de reseteo de contraseña
        await this.passwordResetRepository.deletePasswordReset(token);
    }
}

