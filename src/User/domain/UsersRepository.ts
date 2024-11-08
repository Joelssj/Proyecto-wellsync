import { User } from "./User";

export interface UsersRepository {
    saveUser(user: User): Promise<void>;  // Guardar usuario
    getUserByEmail(correo: string): Promise<User | null>;  // Obtener usuario por correo
    getByUuid(uuid: string): Promise<User | null>;  // Obtener usuario por UUID
    getUserByUuid(uuid: string): Promise<User | null>;  // Obtener usuario por UUID (puedes unificar esto con la anterior si lo prefieres)
    deleteUserByUuid(uuid: string): Promise<void>;  // Eliminar usuario por UUID
    updateUser(user: User): Promise<void>;  // Actualizar usuario
    login(correo: string, password: string): Promise<User | null>;  // Validar login
}
