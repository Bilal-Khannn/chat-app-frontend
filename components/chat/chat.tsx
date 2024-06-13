import styles from './chat.module.css';
import { LuSendHorizonal } from 'react-icons/lu';
import { VscBold } from 'react-icons/vsc';
import { FiItalic } from 'react-icons/fi';
import { FiLink } from 'react-icons/fi';
import { IMessage } from '@/interfaces/chat';
import Image from 'next/image';
import { convertTo12HourFormat } from '@/utils/helper';

export const Chat = ({
    message,
    setMessage,
    onSendMessage,
    conversationTitle,
    conversationData,
    receiverId
}: {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    onSendMessage: (receiverId: number | undefined) => void;
    conversationTitle?: string;
    conversationData?: IMessage[];
    receiverId?: number;
}) => {
    return (
        <div className={styles.chatContainer}>
            {conversationTitle ? (
                <p className={styles.chatTitle}>{conversationTitle}</p>
            ) : (
                <div></div>
            )}

            <div className={styles.messageMainContainer}>
                <div className={styles.chatMessages}>
                    {conversationData &&
                        conversationData.length > 0 &&
                        conversationData.map((conversation, index) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.messageContainer}
                                >
                                    <Image
                                        src={'/images/dummy3.jpeg'}
                                        alt="dummy3"
                                        height={35}
                                        width={35}
                                        style={{ borderRadius: '50%' }}
                                    />
                                    <div
                                        className={
                                            styles.messageContentContainer
                                        }
                                    >
                                        <p className={styles.messageSenderName}>
                                            {conversation.sender_name}{' '}
                                            <span
                                                className={
                                                    styles.messageTimestamp
                                                }
                                            >
                                                {convertTo12HourFormat(
                                                    conversation.timestamp
                                                )}
                                            </span>
                                        </p>
                                        <p className={styles.messageContent}>
                                            {conversation.content}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>

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
                    <div
                        className={styles.sendMessage}
                        onClick={() => onSendMessage(receiverId)}
                    >
                        <LuSendHorizonal />
                    </div>
                </div>
            </div>
        </div>
    );
};
