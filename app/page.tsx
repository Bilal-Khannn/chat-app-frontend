'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { SignUp } from '@/components/signup/signup';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>Pulse</div>
                <SignUp />
            </div>
        </div>
    );
}
