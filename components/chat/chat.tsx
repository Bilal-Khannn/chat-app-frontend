import styles from './chat.module.css';
import { LuSendHorizonal } from 'react-icons/lu';
import { VscBold } from 'react-icons/vsc';
import { FiItalic } from 'react-icons/fi';
import { FiLink } from 'react-icons/fi';

export const Chat = ({
    message,
    setMessage,
    onSendMessage
}: {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    onSendMessage: () => void;
}) => {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatMessages}></div>

            <div className={styles.chatEditor}>
                <div className={styles.messageTools}>
                    <VscBold size={20} />
                    <FiItalic size={20} />
                    <FiLink size={20} />
                </div>
                <input
                    className={styles.messageInput}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <div className={styles.sendMessage} onClick={onSendMessage}>
                    <LuSendHorizonal />
                </div>
            </div>
        </div>
    );
};
