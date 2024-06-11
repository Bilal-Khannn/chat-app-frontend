'use client';
import { Button } from '../ui/button/button';
import { useState } from 'react';
import { Dialog } from '../ui/dialog/dialog';
import { Input } from '../ui/input/input';
import styles from './signup.module.css';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signUpService } from '@/services/auth';
import { ISignUpFormValues } from '@/interfaces/user';

export const SignUp = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ISignUpFormValues>();

    const {
        data,
        isPending,
        error,
        mutate: signupMutation
    } = useMutation({
        mutationFn: signUpService,
        onSuccess: (value) => {
            console.log('value', value);
        },
        onError: () => {
            console.log(error);
        }
    });

    const onSubmit = (data: ISignUpFormValues) => {
        // setLoading(true);
        console.log('Sign up data:', data);

        signupMutation({
            displayName: data.displayName,
            email: data.email,
            username: data.username,
            password: data.password
        });
    };

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
                            type="text"
                            placeholder="Display Name"
                            {...register('displayName', {
                                required: 'Display name is required'
                            })}
                        />
                        {errors.displayName && (
                            <p className={styles.error}>
                                {errors.displayName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Username"
                            {...register('username', {
                                required: 'Username is required'
                            })}
                        />
                        {errors.username && (
                            <p className={styles.error}>
                                {errors.username.message}
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
                            text="Sign Up"
                            type="submit"
                            color="primary"
                            loading={loading}
                            onClick={() => {}}
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};
