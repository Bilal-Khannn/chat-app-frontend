'use client';
import { Button } from '@/components/button/button';
import styles from './page.module.css';
import { useState } from 'react';
import { Dialog } from '@/components/dialog/dialog';

export default function Home() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    return (
        <div className={styles.container}>
            <h1>hello</h1>
            <Button
                text="Testing Dialog"
                color="secondary"
                onClick={() => setDialogOpen(true)}
            />
            <Dialog
                title="Some Dialog"
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <p>This is some random content for testing Dialog</p>
            </Dialog>

            <Button
                text="another"
                color="secondary"
                onClick={() => console.log('hello')}
            />
        </div>
    );
}
