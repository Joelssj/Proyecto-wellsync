import { TwilioAdapter } from "../infraestructure/adapters/TwilioAdapter";
import { LeadsRepository } from "../../Lead/domain/LeadsRepository";
import { TokenRepository } from "../../Token/domain/TokenRepository";
import { Lead } from "../../Lead/domain/Lead";
import { Token } from "../../Token/domain/Token";
import { v4 as uuidv4 } from 'uuid';

export class SendVerificationCodeUseCase {
    constructor(
        private readonly leadsRepository: LeadsRepository,
        private readonly tokenRepository: TokenRepository,
        private readonly twilioAdapter: TwilioAdapter
    ) {}

    async run(nombre: string, apellido: string, correo: string, numero: string): Promise<void> {
        const leadUuid = uuidv4(); 

        // Crear un nuevo lead
        const lead = new Lead(leadUuid, nombre, apellido, correo, numero);
        await this.leadsRepository.saveLead(lead);

        // Generar el token de verificación y guardarlo en la tabla de tokens
        const tokenValue = Math.floor(1000 + Math.random() * 9000).toString();
        const token = new Token(uuidv4(), leadUuid, tokenValue, new Date(Date.now() + 3600 * 1000)); // Expira en 1 hora
        await this.tokenRepository.saveToken(token);

        // Enviar el mensaje de verificación a través de Twilio
        const message = `¡Bienvenido, ${nombre}! Tu token de verificación es: ${tokenValue}`;
        await this.twilioAdapter.sendMessage(numero, message); 
    }
}
