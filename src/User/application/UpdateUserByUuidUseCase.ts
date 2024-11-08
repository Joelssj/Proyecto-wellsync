import { UsersRepository } from "../domain/UsersRepository";
import { User } from "../domain/User";
import bcrypt from 'bcrypt';

export class UpdateUserByUuidUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async run(uuid: string, nombre: string, apellido: string, correo: string, password?: string): Promise<void> {
        const user = await this.usersRepository.getUserByUuid(uuid);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Si se proporciona una nueva contraseña, encriptarla
        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar la información del usuario
        const updatedUser = new User(user.uuid, nombre, apellido, correo, hashedPassword);

        // Guardar el usuario actualizado en el repositorio
        await this.usersRepository.updateUser(updatedUser);
    }
}
