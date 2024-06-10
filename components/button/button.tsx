import styles from './button.module.css';

type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary';
};

export const Button = ({
    text,
    onClick,
    disabled = false,
    size = 'medium',
    color = 'primary'
}: ButtonProps) => {
    const classNames = [styles.button, styles[size], styles[color]].join(' ');

    return (
        <button onClick={onClick} disabled={disabled} className={classNames}>
            {text}
        </button>
    );
};
