import styles from './button.module.css';

type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
};

export const Button = ({
    text,
    onClick,
    disabled = false,
    size = 'medium',
    color = 'primary',
    type = 'button',
    loading = false
}: ButtonProps) => {
    const classNames = [styles.button, styles[size], styles[color]].join(' ');

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={classNames}
            style={{
                position: 'relative',
                width: '100%',
                height: '40px',
                padding: '8px 16px',
                cursor: `${loading ? 'not-allowed' : 'pointer'}`
            }}
        >
            {loading && (
                <span className={styles.spinnerWrapper}>
                    <span className={styles.spinner}></span>
                </span>
            )}
            {!loading && text}
        </button>
    );
};
