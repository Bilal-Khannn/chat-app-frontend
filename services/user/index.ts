import { ISignUpFormValues, ISignInFormValues } from '@/interfaces/user';

export async function signUpService(formData: ISignUpFormValues) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                displayName: formData.displayName,
                username: formData.username,
                password: formData.password
            })
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}

export async function signInService(formData: ISignInFormValues) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}
