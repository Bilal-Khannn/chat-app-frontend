export interface ISignUpFormValues {
    email: string;
    displayName: string;
    username: string;
    password: string;
}

export interface ISignInFormValues {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    displayName: string;
    username: string;
    password: string;
    profilePicture: string;
}
