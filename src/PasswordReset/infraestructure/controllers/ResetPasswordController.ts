import { Request, Response } from "express";
import { ResetPasswordUseCase } from "../../application/ResetPasswordUseCase";

export class ResetPasswordController {
    constructor(private readonly resetPasswordUseCase: ResetPasswordUseCase) {}

    async run(req: Request, res: Response): Promise<Response> {
        const { token, newPassword, confirmPassword } = req.body;

        try {
            await this.resetPasswordUseCase.run(token, newPassword, confirmPassword);
            return res.status(200).json({ message: "Contraseña actualizada correctamente." });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            return res.status(400).json({ error: errorMessage });
        }
    }
}

