import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

interface ZeroBounceResponse {
    email: string;
    status: string;
    sub_status?: string;
    domain?: string;
    // Otros campos opcionales que puede devolver la API
}

export async function validateEmailWithZeroBounce(email: string): Promise<boolean> {
    const apiKey = process.env.ZEROBOUNCE_API_KEY;  // Cargar la clave desde el archivo .env

    const response = await fetch(`https://api.zerobounce.net/v2/validate?email=${email}&apikey=${apiKey}`);
    
    // Verificar si la respuesta es JSON o HTML (u otro formato)
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        // Hacemos casting de unknown a ZeroBounceResponse
        const data = await response.json() as ZeroBounceResponse;

        // Retorna true si el correo es válido
        return data.status === 'valid';
    } else {
        // Si no es JSON, obtén el texto directamente
        const errorText = await response.text();
        console.error('Error en la respuesta de ZeroBounce:', errorText);
        throw new Error('Error en la validación del correo electrónico. Verifica la API Key y el uso.');
    }
}
