import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserAndSendTokenUseCase";

export class CreateUserController {
    constructor(private readonly createUserAndSendTokenUseCase: CreateUserUseCase) {}

    async run(req: Request, res: Response): Promise<Response> {
        const { nombre, apellido, correo, password, confirmPassword } = req.body;

        try {
            // Usar el caso de uso para crear el usuario
            const user = await this.createUserAndSendTokenUseCase.run(nombre, apellido, correo, password, confirmPassword);
            
            // Devolver la respuesta con los datos del usuario creado
            return res.status(201).json({
                message: "Usuario creado exitosamente",
                user: {
                    uuid: user.uuid,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    correo: user.correo
                }
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            return res.status(500).json({ error: errorMessage });
        }
    }
}



