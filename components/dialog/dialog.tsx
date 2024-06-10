import styles from './dialog.module.css';

type DialogProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Dialog = ({ title, isOpen, onClose, children }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <div className={styles.dialog}>
                <div className={styles.dialogHeader}>
                    <h1 className={styles.dialogTitle}>{title}</h1>
                    <button onClick={onClose}>&times;</button>
                </div>
                <div className={styles.dialogBody}>{children}</div>
                <div className={styles.dialogFooter}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    );
};
