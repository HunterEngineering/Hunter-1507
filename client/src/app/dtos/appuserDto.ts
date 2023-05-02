export class appuserDto
{
    userName: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    knownAs: string = '';

    phone: string = '';
    city: string = '';
    state: string = '';
    country: string = '';

    email: string = '';

    canTrial: boolean = false;
    trialbegan!: Date;
    trialend!: Date;

    ccTypeUser: boolean = false;
    nameOnCC: string = '';
    ccNumber: string = '';
    ccExpires: string = '';
    ccAuthCode: string = '';

    question: string = '';
    answer: string = '';

    roles: string = '';
}