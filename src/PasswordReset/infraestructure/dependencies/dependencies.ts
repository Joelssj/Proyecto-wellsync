import { MySQLPasswordResetRepository } from "../adapter/MySQLPasswordResetRepository";
import { CreatePasswordResetUseCase } from "../../application/CreatePasswordResetUseCase";
import { ResetPasswordUseCase } from "../../application/ResetPasswordUseCase";
import { CreatePasswordResetController } from "../controllers/CreatePasswordResetController"
import { ResetPasswordController } from "../controllers/ResetPasswordController";
import { EmailAdapter } from "../adapter/EmailPasswordAdapter";
import { MySQLUsersRepository } from "../../../User/infraestructure/adapters/MysqlUsersRepository";


// Repositorios
export const passwordResetRepository = new MySQLPasswordResetRepository();
export const emailAdapter = new EmailAdapter();
export const usersRepository = new MySQLUsersRepository();  // Cambia UsersRepository por MySQLUsersRepository

// Casos de uso
export const createPasswordResetUseCase = new CreatePasswordResetUseCase(
    passwordResetRepository,
    usersRepository,
    emailAdapter
);

export const resetPasswordUseCase = new ResetPasswordUseCase(
    passwordResetRepository,
    usersRepository
);

// Controladores
export const createPasswordResetController = new CreatePasswordResetController(createPasswordResetUseCase);
export const resetPasswordController = new ResetPasswordController(resetPasswordUseCase);
