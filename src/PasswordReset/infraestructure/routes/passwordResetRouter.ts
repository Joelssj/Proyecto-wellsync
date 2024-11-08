import { Router } from "express";
import { createPasswordResetController, resetPasswordController } from "../dependencies/dependencies";

const router = Router();

// Ruta para solicitar la recuperación de la contraseña
router.post("/password-reset", (req, res) => createPasswordResetController.run(req, res));
router.post("/validar", (req, res) => resetPasswordController.run(req, res));

export { router as passwordResetRouter };
