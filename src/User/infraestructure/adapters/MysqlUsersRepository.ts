import { UsersRepository } from "../../domain/UsersRepository";
import { User } from "../../domain/User";
import { query } from "../../../database/mysql/mysql";
import bcrypt from 'bcrypt';

export class MySQLUsersRepository implements UsersRepository {
    async saveUser(user: User): Promise<void> {
        const sql = "INSERT INTO users (uuid, nombre, apellido, correo, password) VALUES (?, ?, ?, ?, ?)";
        const params = [user.uuid, user.nombre, user.apellido, user.correo, user.password];
        await query(sql, params);
    }

    async getUserByEmail(correo: string): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE correo = ?";
        const params = [correo];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const user = result[0];
        return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
    }

    async getByUuid(uuid: string): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE uuid = ?";
        const params = [uuid];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const user = result[0];
        return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
    }

    async login(correo: string, password: string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE correo = ?";
            const params = [correo];
            const [result]: any = await query(sql, params);

            if (result.length === 0) return null;

            const user = result[0];

            // Verificar si la contraseña es correcta
            if (user && await bcrypt.compare(password, user.password)) {
                return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
            }

            return null;  // Contraseña incorrecta o usuario no encontrado
        } catch (error) {
            console.error("Error en login:", error);
            throw new Error("Error en el proceso de login");
        }
    }

    async getUserByUuid(uuid: string): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE uuid = ?";
        const params = [uuid];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const user = result[0];
        return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
    }

    async deleteUserByUuid(uuid: string): Promise<void> {
        const sql = "DELETE FROM users WHERE uuid = ?";
        const params = [uuid];
        await query(sql, params);
    }

    async updateUser(user: User): Promise<void> {
        const sql = "UPDATE users SET nombre = ?, apellido = ?, correo = ?, password = ? WHERE uuid = ?";
        const params = [user.nombre, user.apellido, user.correo, user.password, user.uuid];
        await query(sql, params);
    }

    // --- Métodos para la funcionalidad de reseteo de contraseña ---

    // Guardar el token de reseteo en la base de datos
    async savePasswordResetToken(uuid: string, token: string, expiration: Date): Promise<void> {
        const sql = "INSERT INTO password_resets (uuid, token, expiration) VALUES (?, ?, ?)";
        const params = [uuid, token, expiration];
        await query(sql, params);
    }

    // Obtener el token de reseteo de la base de datos
    async getPasswordResetToken(token: string): Promise<{ uuid: string, expiration: Date } | null> {
        const sql = "SELECT uuid, expiration FROM password_resets WHERE token = ?";
        const params = [token];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const passwordReset = result[0];
        return {
            uuid: passwordReset.uuid,
            expiration: new Date(passwordReset.expiration)
        };
    }

    // Eliminar el token de reseteo después de usarlo
    async deletePasswordResetToken(token: string): Promise<void> {
        const sql = "DELETE FROM password_resets WHERE token = ?";
        const params = [token];
        await query(sql, params);
    }
}






/*import { UsersRepository } from "../../domain/UsersRepository";
import { User } from "../../domain/User";
import { query } from "../../../database/mysql/mysql";
import bcrypt from 'bcrypt';

export class MySQLUsersRepository implements UsersRepository {
    async saveUser(user: User): Promise<void> {
        const sql = "INSERT INTO users (uuid, nombre, apellido, correo, password) VALUES (?, ?, ?, ?, ?)";
        const params = [user.uuid, user.nombre, user.apellido, user.correo, user.password];
        await query(sql, params);
    }

    async getUserByEmail(correo: string): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE correo = ?";
        const params = [correo];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const user = result[0];
        return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
    }

    async getByUuid(uuid: string): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE uuid = ?";
        const params = [uuid];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const user = result[0];
        return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
    }

    async login(correo: string, password: string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE correo = ?";
            const params = [correo];
            const [result]: any = await query(sql, params);

            if (result.length === 0) return null;

            const user = result[0];

            // Verificar si la contraseña es correcta
            if (user && await bcrypt.compare(password, user.password)) {
                return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
            }

            return null;  // Contraseña incorrecta o usuario no encontrado
        } catch (error) {
            console.error("Error en login:", error);
            throw new Error("Error en el proceso de login");
        }
    }

    async getUserByUuid(uuid: string): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE uuid = ?";
        const params = [uuid];
        const [result]: any = await query(sql, params);

        if (result.length === 0) return null;

        const user = result[0];
        return new User(user.uuid, user.nombre, user.apellido, user.correo, user.password);
    }

    async deleteUserByUuid(uuid: string): Promise<void> {
        const sql = "DELETE FROM users WHERE uuid = ?";
        const params = [uuid];
        await query(sql, params);
    }

    async updateUser(user: User): Promise<void> {
        const sql = "UPDATE users SET nombre = ?, apellido = ?, correo = ?, password = ? WHERE uuid = ?";
        const params = [user.nombre, user.apellido, user.correo, user.password, user.uuid];
        await query(sql, params);
    }
}*/

