import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
    verifySession,
    signInService,
    signOutService,
    signUpService
} from '@/services/auth';
import { toast } from 'sonner';

export const useSession = () => {
    return useQuery({
        queryKey: ['session'],
        queryFn: verifySession,
        retry: false
    });
};

export const useSignIn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: signInService,
        onSuccess: (value) => {
            console.log('value', value);
            localStorage.setItem('user', JSON.stringify(value.data));
            queryClient.invalidateQueries({ queryKey: ['session'] });
            toast.success('Logged in successfully!');
        },
        onError: (error) => {
            console.log(error);
        }
    });
};
