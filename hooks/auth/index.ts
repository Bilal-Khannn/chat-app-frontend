import { useQuery } from '@tanstack/react-query';
import { verifySession } from '@/services/auth';

export const useSession = () => {
    return useQuery({
        queryKey: ['session'],
        queryFn: verifySession
    });
};
