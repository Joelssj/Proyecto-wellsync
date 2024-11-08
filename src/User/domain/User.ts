export class User {
    constructor(
        public uuid: string,
        public nombre: string,       // Campo para nombre
        public apellido: string,     // Campo para apellido
        public correo: string,       // Campo para correo
        public password: string,     // Campo para contraseña
    ) {}

    // Método para verificar que la contraseña y confirmación coinciden
    public static validatePassword(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }
}
