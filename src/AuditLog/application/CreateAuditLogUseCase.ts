// CreateAuditLogUseCase.ts
import { AuditLogRepository } from "../domain/AuditLogRepository";
import { AuditLog } from "../domain/AuditLog";
import { v4 as uuidv4 } from "uuid";

export class CreateAuditLogUseCase {
    constructor(private readonly auditLogRepository: AuditLogRepository) {}

    async execute(userId: string, actionType: string, details: string): Promise<void> {
        const auditLog = new AuditLog(uuidv4(), userId, actionType, details, new Date());
        await this.auditLogRepository.save(auditLog);
    }
}
