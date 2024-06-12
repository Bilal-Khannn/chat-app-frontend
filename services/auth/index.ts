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
            }),
            credentials: 'include'
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}

export async function signOutService() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}

export async function refreshTokenService(token: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    console.log('result', result);

    return result;
}

export async function verifySession() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-session`,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}
