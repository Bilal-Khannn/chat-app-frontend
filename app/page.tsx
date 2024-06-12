'use client';
import { SignIn } from '@/components/signin/signin';
import styles from './page.module.css';
import { SignUp } from '@/components/signup/signup';
import { Toaster } from 'sonner';
import { socket } from '@/socket';
import { useState, useEffect } from 'react';
import { useSession } from '@/hooks/auth';
import { Loader } from '@/components/ui/loader/loader';
import { FaRegUserCircle } from 'react-icons/fa';

export default function Home() {
    const { data, isLoading, isError } = useSession();

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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
