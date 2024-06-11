'use client';
import { Button } from '../ui/button/button';
import { useState } from 'react';
import { Dialog } from '../ui/dialog/dialog';
import { Input } from '../ui/input/input';
import styles from './signin.module.css';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signInService } from '@/services/auth';
import { ISignInFormValues } from '@/interfaces/user';
import { toast } from 'sonner';

export const SignIn = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ISignInFormValues>();

    const {
        data,
        isPending,
        error,
        mutate: signInMutation
    } = useMutation({
        mutationFn: signInService,
        onSuccess: (value) => {
            console.log('value', value);
            toast.success('Logged in successfully!');
        },
        onError: () => {
            console.log(error);
        }
    });

    const onSubmit = (data: ISignInFormValues) => {
        // setLoading(true);

        signInMutation({
            email: data.email,
            password: data.password
        });
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
                            loading={loading}
                            onClick={() => {}}
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};
