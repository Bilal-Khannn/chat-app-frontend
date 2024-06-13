'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useSession } from '@/hooks/auth';
import { Loader } from '../ui/loader/loader';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { data: session, isLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !session) {
            router.push('/');
        }
    }, [isLoading, session, router]);

    if (isLoading || !session) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '1rem'
                }}
            >
                <Loader />
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
