import { Signale } from "signale";
import express from "express";
import { passwordResetRouter } from "./PasswordReset/infraestructure/routes/passwordResetRouter";
import { userRouter } from "./User/infraestructure/routes/userRouter";
import 'dotenv/config';
import cors from 'cors';

const app = express();
const signale = new Signale();
app.use(express.json());

// Configuración de CORS 
const corsOptions = {
  origin: 'https://Aqui tendria que ir el front de el proycto, pero como aun no tenemos, asi lo dejare por el momento', 
  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Permite cookies y autenticación
};

app.use(cors(corsOptions));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reset", passwordResetRouter);

const port = 3010;
const host = '0.0.0.0';

app.listen(port, host, () => {
  signale.success("Server online in port 3010");
});


/*import { Signale } from "signale";
import express from "express";
import { passwordResetRouter } from "./PasswordReset/infraestructure/routes/passwordResetRouter";
import { userRouter } from "./User/infraestructure/routes/userRouter";
import 'dotenv/config';
import cors from 'cors';

const app = express();
const signale = new Signale();
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reset", passwordResetRouter);

const port = 3010;
const host = '0.0.0.0';

app.listen(port, host, () => {
  signale.success("Server online in port 3010");
});

*/