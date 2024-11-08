
import { MySQLUsersRepository } from "../adapters/MysqlUsersRepository";
import { CreateUserUseCase} from "../../application/CreateUserAndSendTokenUseCase"
import { CreateUserController } from "../controllers/CreateUserController";
import { EmailAdapter } from "../../../Notifications/infraestructure/adapters/EmailAdapter"; 
import { LoginUseCase } from "../../application/LoginUseCase";
import { LoginController } from "../controllers/LoginController";
import { GetUserByUuidUseCase } from "../../application/GetUserByUuidUseCase";
import { GetUserByUuidController } from "../controllers/GetUserByUuidController";
import { DeleteUserByUuidUseCase } from "../../application/DeleteUserByUuidUseCase";
import { DeleteUserByUuidController } from "../controllers/DeleteUserByUuidController";
import { UpdateUserByUuidUseCase } from "../../application/UpdateUserByUuidUseCase";
import { UpdateUserByUuidController } from "../controllers/UpdateUserByUuidController";
import { AuditService } from "../../../AuditLog/infraestructure/services/AuditService";
import { MysqlAuditLogRepository } from "../../../AuditLog/infraestructure/adapters/MysqlAuditLogRepository";






// Repositorios
export const usersRepository = new MySQLUsersRepository();
export const emailAdapter = new EmailAdapter();  
const auditLogRepository = new MysqlAuditLogRepository();


export const auditService = new AuditService(auditLogRepository);


// Casos de uso
export const createUserUseCase = new CreateUserUseCase(usersRepository, emailAdapter); 
export const getUserByUuidUseCase = new GetUserByUuidUseCase(usersRepository);
export const deleteUserByUuidUseCase = new DeleteUserByUuidUseCase(usersRepository);
export const updateUserByUuidUseCase = new UpdateUserByUuidUseCase(usersRepository);
export const loginUseCase = new LoginUseCase(usersRepository);

// Controladores
export const createUserController = new CreateUserController(createUserUseCase);
export const loginController = new LoginController(loginUseCase, auditService);   
export const getUserByUuidController = new GetUserByUuidController(getUserByUuidUseCase);
export const deleteUserByUuidController = new DeleteUserByUuidController(deleteUserByUuidUseCase);
export const updateUserByUuidController = new UpdateUserByUuidController(updateUserByUuidUseCase);
