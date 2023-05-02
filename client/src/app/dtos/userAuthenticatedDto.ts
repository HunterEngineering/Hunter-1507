import { User } from '../entities/User';

export class UserAuthenticatedDto {
    public username: string = "";
    public token: string = "";
    public roleslist: string = "";
    public knownAs: string = "";
}
