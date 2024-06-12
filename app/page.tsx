'use client';
import { SignIn } from '@/components/signin/signin';
import styles from './page.module.css';
import { SignUp } from '@/components/signup/signup';
import { Toaster } from 'sonner';
import { useSession } from '@/hooks/auth';
import { Loader } from '@/components/ui/loader/loader';
import { FaRegUserCircle } from 'react-icons/fa';
import Message from '@/components/message/message';
import { Button } from '@/components/ui/button/button';
import { useMutation } from '@tanstack/react-query';
import { signOutService } from '@/services/auth';
import { toast } from 'sonner';

export default function Home() {
    const { data, isLoading, isError, refetch } = useSession();

    const { mutate: signOutMutation } = useMutation({
        mutationFn: signOutService,
        onSuccess: async (value) => {
            console.log('value', value);
            localStorage.removeItem('user');
            toast.success('Logged out successfully!');
            await refetch();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleLogout = () => {
        signOutMutation();
    };

    return (
        <>
            <Toaster position="top-center" richColors duration={1000} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.logo}>Pulse</div>
                    <div className={styles.btnContainer}>
                        {isLoading && <Loader />}

                        {isError && (
                            <>
                                <SignUp />
                                <SignIn />
                            </>
                        )}

                        {data && !isLoading && !isError && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '2rem',
                                        marginTop: '4px'
                                    }}
                                >
                                    <FaRegUserCircle />
                                </div>
                                <div style={{ fontSize: '1.2rem' }}>
                                    {data.data.displayName}
                                </div>

                                <Button
                                    onClick={() => handleLogout()}
                                    text="Logout"
                                    color="primary"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Message />
        </>
    );
}
