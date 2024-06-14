'use client';
import styles from './page.module.css';
import Search from '@/components/ui/search/search';
import { useState, useEffect } from 'react';
import { DashNav } from '@/components/dashnav/dashnav';
import { DashManager } from '@/components/dashmanager/dashmanager';
import { Chat } from '@/components/chat/chat';
import { sendMessageService } from '@/services/chat';
import ProtectedRoute from '@/components/protected/protected';
import { useOneToOneChat } from '@/hooks/chat';
import { useConversation } from '@/hooks/chat';
import { useLocalStorageUser } from '@/hooks/auth';
import { IMessage } from '@/interfaces/chat';
import { socket } from '@/config/socket';

export default function Dashboard() {
    const [chatId, setChatId] = useState<number | undefined>();
    const { user } = useLocalStorageUser();
    const { data: oneToOneChatData } = useOneToOneChat();
    const { data: conversation, addMessageToConversation } =
        useConversation(chatId);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [conversationTitle, setConversationTitle] = useState<string>('');
    const [receiverId, setReceiverId] = useState<number | undefined>(undefined);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSendMessage = async () => {
        if (!message || !receiverId || !user?.id) return;

        const newMessage: IMessage = {
            content: message,
            id: Date.now(),
            sender_id: user.id,
            sender_name: user.displayName,
            timestamp: new Date().toISOString()
        };

        try {
            await sendMessageService({
                content: message,
                receiverId: receiverId,
                senderId: user.id
            });

            addMessageToConversation(newMessage, chatId);

            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    useEffect(() => {
        if (user?.id) {
            if (!socket.connected) {
                socket.connect();
            }

            socket.emit('joinRoom', user?.id);

            const handleMessage = (message: IMessage) => {
                addMessageToConversation(message, message.chatId);
            };

            // Register the event listener once
            socket.on('chatMessage', handleMessage);

            // Cleanup event listener on component unmount
            return () => {
                socket.off('chatMessage', handleMessage);
            };
        }
    }, [user]);

    return (
        <ProtectedRoute>
            <div className={styles.mainContainer}>
                <header className={styles.headerContainer}>
                    <Search
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search QLU Recruiting"
                    />
                </header>

                <div style={{ display: 'flex', height: '93.2vh' }}>
                    {/* first container  */}
                    <DashNav />

                    {/* second container  */}
                    {oneToOneChatData && oneToOneChatData.data && (
                        <DashManager
                            fetchChat={(
                                chatId: number,
                                chatTitle: string,
                                receiverId: number
                            ) => {
                                setChatId(chatId);
                                setConversationTitle(chatTitle);
                                setReceiverId(receiverId);
                            }}
                            chatMemberData={oneToOneChatData.data}
                        />
                    )}

                    {/* third container  */}
                    <Chat
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={onSendMessage}
                        conversationData={conversation ? conversation : null}
                        conversationTitle={conversationTitle}
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
}
