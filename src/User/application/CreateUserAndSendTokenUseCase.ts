import { UsersRepository } from "../domain/UsersRepository";
import { v4 as uuidv4 } from "uuid";
import { User } from "../domain/User";
import bcrypt from 'bcrypt';
import { EmailAdapter } from "../../Notifications/infraestructure/adapters/EmailAdapter";

export class CreateUserUseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly emailAdapter: EmailAdapter // Inyectar el adaptador de correo
    ) {}

    // Crear usuario
    async run(nombre: string, apellido: string, correo: string, password: string, confirmPassword: string): Promise<User> {
        try {
            // Verificar si la contraseña y la confirmación coinciden
            if (password !== confirmPassword) {
                throw new Error("Las contraseñas no coinciden.");
            }

            // Validar requisitos de la contraseña
            if (!this.isPasswordValid(password)) {
                throw new Error("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.");
            }

            // Encriptar la contraseña antes de guardar
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario
            const userUuid = uuidv4();
            const user = new User(userUuid, nombre, apellido, correo, hashedPassword);

            // Guardar el usuario en el repositorio
            await this.usersRepository.saveUser(user);

            // Enviar el correo de bienvenida
            await this.emailAdapter.sendEmail(
                correo, 
                'Bienvenido a WellSync', 
                `Hola ${nombre}, bienvenido/a a WellSync. Ya eres parte de nuestra comunidad.`
            );

            console.log("Usuario creado exitosamente y correo enviado.");

            // Retornar el usuario creado
            return user;

        } catch (error) {
            // Manejo de errores
            console.error("Error en la creación de usuario:", error);

            // Rethrow del error para que el controlador maneje el mensaje de respuesta
            throw new Error(`Error en la creación de usuario: ${error}`);
        }
    }

    // Método de validación de la contraseña
    private isPasswordValid(password: string): boolean {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return hasMinLength && hasUpperCase && hasNumber;
    }
}




/*import { UsersRepository } from "../../User/domain/UsersRepository";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../User/domain/User";
import bcrypt from 'bcrypt';
import { EmailAdapter } from "../../Notifications/infraestructure/adapters/EmailAdapter";

export class CreateUserUseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly emailAdapter: EmailAdapter // Inyectar el adaptador de correo
    ) {}

    // Crear usuario
    async run(nombre: string, apellido: string, correo: string, password: string, confirmPassword: string): Promise<User> {
        // Verificar si la contraseña y la confirmación coinciden
        if (password !== confirmPassword) {
            throw new Error("Las contraseñas no coinciden.");
        }

        // Validar requisitos de la contraseña
        if (!this.isPasswordValid(password)) {
            throw new Error("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.");
        }
        // Encriptar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const userUuid = uuidv4();
        const user = new User(userUuid, nombre, apellido, correo, hashedPassword);

        // Guardar el usuario en el repositorio
        await this.usersRepository.saveUser(user);

        // Enviar el correo de bienvenida
        await this.emailAdapter.sendEmail(
            correo, 
            'Bienvenido a WellSync', 
            `Hola ${nombre}, bienvenido/a a WellSync. Ya eres parte de nuestra comunidad.`
        );

        console.log("Usuario creado exitosamente y correo enviado.");
        
        // Retornar el usuario creado
        return user;
    }

    // Método de validación de la contraseña
    private isPasswordValid(password: string): boolean {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return hasMinLength && hasUpperCase && hasNumber;
    }
}*/








/*


import { UsersRepository } from "../../User/domain/UsersRepository";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../User/domain/User";
import bcrypt from 'bcrypt';
import { EmailAdapter } from "../../Notifications/infraestructure/adapters/EmailAdapter";


export class CreateUserUseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly emailAdapter: EmailAdapter // Inyectar el adaptador de correo
    ) {}

    // Crear usuario
    async run(nombre: string, apellido: string, correo: string, password: string, confirmPassword: string): Promise<User> {
        // Verificar si la contraseña y la confirmación coinciden
        if (password !== confirmPassword) {
            throw new Error("Las contraseñas no coinciden.");
        }

        // Encriptar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const userUuid = uuidv4();
        const user = new User(userUuid, nombre, apellido, correo, hashedPassword); // confirmPassword no se incluye en el User

        // Guardar el usuario en el repositorio
        await this.usersRepository.saveUser(user);

        // Enviar el correo de bienvenida
        await this.emailAdapter.sendEmail(
            correo, 
            'Bienvenido a WellSync', 
            `Hola ${nombre}, bienvenido/a a WellSync. Ya eres parte de nuestra comunidad.`
        );

        console.log("Usuario creado exitosamente y correo enviado.");
        
        // Retornar el usuario creado
        return user;
    }

/*    // Obtener usuario por UUID
    async getUserByUuid(uuid: string): Promise<User | null> {
        const user = await this.usersRepository.getUserByUuid(uuid);
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }
        return user;
    }

    // Actualizar usuario
    async updateUser(uuid: string, nombre: string, apellido: string, correo: string, password?: string): Promise<void> {
        const user = await this.usersRepository.getUserByUuid(uuid);
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }

        // Si se proporciona una nueva contraseña, encriptarla
        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar la información del usuario
        user.nombre = nombre;
        user.apellido = apellido;
        user.correo = correo;
        user.password = hashedPassword;

        // Actualizar el usuario en el repositorio
        await this.usersRepository.updateUser(user);

        console.log("Usuario actualizado exitosamente.");
    }

    // Eliminar usuario por UUID
    async deleteUserByUuid(uuid: string): Promise<void> {
        const user = await this.usersRepository.getUserByUuid(uuid);
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }

        // Eliminar el usuario del repositorio
        await this.usersRepository.deleteUserByUuid(uuid);

        console.log("Usuario eliminado exitosamente.");
    }
}
*/
