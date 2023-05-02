export class registerUserDto {
    userName: string = '';
    password : string = '';
    firstName: string = '';
    lastName: string = '';
    knownAs: string = '';

    canTrial: boolean = false;
    trialBegan?: Date;
    trialEnd?: Date;

    phone: string = '';
    city: string = '';
    state: string = '';
    country: string = '';

    ccTypeUser: boolean = false;
    nameOnCC: string = '';
    ccNumber: string = '';
    ccExpires: string = '';
    ccAuthCode: string = '';

    question: string = '';
    answer: string = '';
}