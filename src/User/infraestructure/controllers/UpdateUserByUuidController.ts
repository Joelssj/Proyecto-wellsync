import { Request, Response } from "express";
import { UpdateUserByUuidUseCase } from "../../application/UpdateUserByUuidUseCase";

export class UpdateUserByUuidController {
    constructor(private readonly updateUserByUuidUseCase: UpdateUserByUuidUseCase) {}

    async run(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.params;
        const { nombre, apellido, correo, password } = req.body; // Nuevos campos

        try {
            // Ejecutar el caso de uso para actualizar el usuario
            await this.updateUserByUuidUseCase.run(uuid, nombre, apellido, correo, password);

            return res.status(200).json({ message: "Usuario actualizado correctamente" });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            return res.status(404).json({ error: errorMessage });
        }
    }
}
