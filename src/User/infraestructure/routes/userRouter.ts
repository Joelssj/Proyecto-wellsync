import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createUserController, loginController, getUserByUuidController, deleteUserByUuidController, updateUserByUuidController } from "../dependencies/dependencies";

const router = Router();


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limita a 10 solicitudes por IP cada 15 minutos
  message: "Demasiadas solicitudes de inicio de sesión, intente de nuevo más tarde."
});

const createUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // Limita a 5 solicitudes por IP cada hora
  message: "Demasiadas solicitudes de creación de cuenta, intente de nuevo más tarde."
});

// Aplicación de limitación de peticiones en rutas específicas
router.post("/create", createUserLimiter, (req, res) => createUserController.run(req, res));
router.post("/login", loginLimiter, (req, res) => loginController.run(req, res));
router.get("/get/:uuid", (req, res) => getUserByUuidController.run(req, res));
router.delete("/delete/:uuid", (req, res) => deleteUserByUuidController.run(req, res));
router.put("/update/:uuid", (req, res) => updateUserByUuidController.run(req, res));

export { router as userRouter };





/*import { Router } from "express";
import { createUserController, loginController, getUserByUuidController, deleteUserByUuidController, updateUserByUuidController } from "../dependencies/dependencies";


const router = Router();

router.post("/create", (req, res) => createUserController.run(req, res));
router.post("/login", (req, res) => loginController.run(req, res));
router.get("/get/:uuid", (req, res) => getUserByUuidController.run(req, res));
router.delete("/delete/:uuid", (req, res) => deleteUserByUuidController.run(req, res));
router.put("/update/:uuid", (req, res) => updateUserByUuidController.run(req, res));

export { router as userRouter };
*/