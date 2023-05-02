declare module namespace {

    export interface Member {
        id: number;
        userName: string;
        knownAs: string;
        email: string;
        phone: string;
        dateCreated: Date;
        durationDays: number;
        projects: any[];
    }
}