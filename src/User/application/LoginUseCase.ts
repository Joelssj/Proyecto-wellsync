import { User } from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";

export class LoginUseCase{
    constructor(readonly usersReposotory: UsersRepository){}

    async run(
        correo:string,
        password:string
    ): Promise<User | null> {
     try {
        const result = await this.usersReposotory.login(
            correo,
            password
        );
        return result;
     } catch (error) {
        return null;
     }
    }
}