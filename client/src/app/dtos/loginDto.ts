export class loginDto 
{
    public Username!: string;  
    public Password!: string;

    constructor(user: string, password: string)
    {
        this.Username = user;
        this.Password = password; 
    }

}