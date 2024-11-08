import { PasswordResetRepository } from "../../domain/PasswordResetRepository";
import { PasswordReset } from "../../domain/PasswordReset";
import { query } from "../../../database/mysql/mysql";

export class MySQLPasswordResetRepository implements PasswordResetRepository {
    async savePasswordReset(passwordReset: PasswordReset): Promise<void> {
        const sql = "INSERT INTO password_resets (correo, token, created_at, expiration) VALUES (?, ?, ?, ?)";
        const params = [passwordReset.correo, passwordReset.token, passwordReset.createdAt, passwordReset.expiresAt];
        await query(sql, params);
    }

    async getPasswordResetByToken(token: string): Promise<PasswordReset | null> {
        const sql = "SELECT correo, token, created_at, expiration FROM password_resets WHERE token = ?";
        const params = [token];
        const [result]: any = await query(sql, params);
        
        if (result.length === 0) return null;

        const record = result[0];
        // Retornamos el objeto con el correo extraído correctamente
        return new PasswordReset(record.correo, record.token, record.created_at, record.expiration);
    }

    async deletePasswordReset(token: string): Promise<void> {
        const sql = "DELETE FROM password_resets WHERE token = ?";
        const params = [token];
        await query(sql, params);
    }
}

