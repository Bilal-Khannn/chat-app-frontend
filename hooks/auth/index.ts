'use client';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { verifySession, signInService } from '@/services/auth';
import { toast } from 'sonner';
import { User } from '@/interfaces/user';

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
            localStorage.setItem('user', JSON.stringify(value.data));
            queryClient.invalidateQueries({ queryKey: ['session'] });
            toast.success('Logged in successfully!');
        },
        onError: (error) => {
            console.log(error);
        }
    });
};

export const useLocalStorageUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return { user };
};
