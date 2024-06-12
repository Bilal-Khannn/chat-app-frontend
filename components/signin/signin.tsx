'use client';
import { Button } from '../ui/button/button';
import { useState } from 'react';
import { Dialog } from '../ui/dialog/dialog';
import { Input } from '../ui/input/input';
import styles from './signin.module.css';
import { useForm } from 'react-hook-form';
import { ISignInFormValues } from '@/interfaces/user';
import { useSignIn } from '@/hooks/auth';

export const SignIn = () => {
    const { mutate: mutateSignIn } = useSignIn();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ISignInFormValues>();

    const onSubmit = (data: ISignInFormValues) => {
        mutateSignIn({ email: data.email, password: data.password });
    };

    return (
        <div>
            <Button
                text="Sign In"
                onClick={() => setDialogOpen(true)}
                color="secondary"
            />
            <Dialog
                title="Sign In"
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.children}
                >
                    <div>
                        <Input
                            type="email"
                            placeholder="Email Address"
                            {...register('email', {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && (
                            <p className={styles.error}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message:
                                        'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.password && (
                            <p className={styles.error}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <Button
                            text="Sign In"
                            type="submit"
                            color="primary"
                            onClick={() => {}}
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};
