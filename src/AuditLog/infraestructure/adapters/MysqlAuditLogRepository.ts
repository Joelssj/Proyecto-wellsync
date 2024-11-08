// MysqlAuditLogRepository.ts
import { AuditLogRepository } from "../../domain/AuditLogRepository";
import { AuditLog } from "../../domain/AuditLog";
import { query } from "../../../database/mysql/mysql";


export class MysqlAuditLogRepository implements AuditLogRepository {
    async save(auditLog: AuditLog): Promise<void> {
        const sql = `INSERT INTO audit_logs (id, user_id, action_type, details, timestamp) VALUES (?, ?, ?, ?, ?)`;
        await query(sql, [auditLog.id, auditLog.userId, auditLog.actionType, auditLog.details, auditLog.timestamp]);
    }
}
