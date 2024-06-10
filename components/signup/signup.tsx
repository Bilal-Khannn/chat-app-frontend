'use client';
import { Button } from '../button/button';
import { useState } from 'react';
import { Dialog } from '../dialog/dialog';
import { Input } from '../input/input';
import styles from './signup.module.css';

export const SignUp = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <Button
                text="Sign Up"
                onClick={() => setDialogOpen(true)}
                color="primary"
            />
            <Dialog
                title="Sign Up"
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <div className={styles.children}>
                    <Input
                        type="text"
                        placeholder="Email Address / Phone Number"
                    />
                    <Input type="text" placeholder="Display Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="text" placeholder="Password" />
                    <div style={{ marginTop: '1rem' }}>
                        <Button
                            text="Sign Up"
                            onClick={() => console.log('Sign up')}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
