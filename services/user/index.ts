import { ISignUpFormValues } from '@/interfaces/ISignUpFormValues';

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
