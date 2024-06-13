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
    display_name: string;
    username: string;
    password: string;
    profile_picture: string;
}
