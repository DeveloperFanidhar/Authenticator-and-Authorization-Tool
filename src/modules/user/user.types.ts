export interface IUser{
    email:string;
    passwordHash: string;
    isEmailVerified: boolean;

    failedLoginAttempts: number;
    lockUntil: Date | null;

    createdAt: Date;
    updatedAt: Date;
}