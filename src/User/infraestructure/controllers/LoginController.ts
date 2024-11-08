// LoginController.ts
import { Request, Response } from "express";
import { LoginUseCase } from "../../application/LoginUseCase";
import { AuditService } from "../../../AuditLog/infraestructure/services/AuditService";
import jwt from 'jsonwebtoken';

export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly auditService: AuditService  // Inyecta el servicio de auditoría
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    // Verificación de que el correo y la contraseña están presentes
    if (!data.correo || !data.password) {
      await this.auditService.logAction('unknown', 'login_failed', 'Correo o contraseña no proporcionados');
      return res.status(400).send({
        status: "Error",
        token: '',
        msn: "Correo o contraseña no proporcionados",
      });
    }

    try {
      const user = await this.loginUseCase.run(data.correo, data.password);

      if (user) {
        const correo = user.correo;
        const token = jwt.sign({ correo }, process.env.JWT_SECRET || 'default_secret', {
          expiresIn: '1h',
          audience: 'your_app_name',    
          issuer: 'your_company_name',  
        });

        // Registro de auditoría de inicio de sesión exitoso
        await this.auditService.logAction(user.uuid, 'login', 'Inicio de sesión exitoso');

        res.status(200).send({
          status: "OK",
          token: token,
          msn: "El usuario o contraseña son correctos",
        });
      } else {
        // Registro de auditoría de intento fallido de inicio de sesión
        await this.auditService.logAction('unknown', 'login_failed', `Intento de inicio de sesión fallido para el correo: ${data.correo}`);
        
        res.status(400).send({
          status: "Error",
          token: '',
          msn: "El usuario o contraseña están incorrectos",
        });
      }
    } catch (error) {
      // Registro de auditoría de error en el inicio de sesión
      await this.auditService.logAction('unknown', 'login_error', `Error en el proceso de inicio de sesión: ${error}`);

      // Manejo de errores internos
      res.status(500).send({
        status: "Error",
        data: "Ha ocurrido un error",
        msn: error,
      });
    }
  }
}




/*import { Request, Response } from "express";
import { LoginUseCase } from "../../application/LoginUseCase";
import jwt from 'jsonwebtoken';

export class LoginController {
  constructor(readonly loginUseCase: LoginUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body
    try {
        const user = await this.loginUseCase.run(
            data.correo,
            data.password
        );
        if (user){
            const correo = user.correo
            const token = jwt.sign({ correo }, 'tu_secreto', { expiresIn: '1h' });
            res.status(200).send({
              status: "OK",
              token: token,
              msn: "El usuario o contraseña son correctos",
            });
        }
        else
            res.status(400).send({
                status: "Error",
                token: '',
                msn: "El usuario o contraseña estan incorectos",
            });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "Error",
        data: "Ha ocurrido un error",
        msn: error,
      });
    }
  }
}*/