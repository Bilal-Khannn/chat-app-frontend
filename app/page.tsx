'use client';
import { SignIn } from '@/components/signin/signin';
import styles from './page.module.css';
import { SignUp } from '@/components/signup/signup';
import { Toaster } from 'sonner';
import { refreshTokenService } from '@/services/auth';

export default function Home() {
    return (
        <>
            <Toaster position="top-center" richColors duration={1000} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.logo}>Pulse</div>
                    <div className={styles.btnContainer}>
                        <SignUp />
                        <SignIn />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <button
                        style={{
                            backgroundColor: 'red',
                            padding: '1rem',
                            fontSize: '1rem',
                            color: 'white'
                        }}
                        onClick={() => refreshTokenService('123')}
                    >
                        test
                    </button>
                </div>
            </div>
        </>
    );
}
