'use client';
import styles from './page.module.css';
import Search from '@/components/ui/search/search';
import { useEffect, useState } from 'react';
import { DashNav } from '@/components/dashnav/dashnav';
import { DashManager } from '@/components/dashmanager/dashmanager';
import { Chat } from '@/components/chat/chat';
import { sendMessageService } from '@/services/chat';
import ProtectedRoute from '@/components/protected/protected';
import { useOneToOneChat } from '@/hooks/chat';
import { useConversation } from '@/hooks/chat';
import { useLocalStorageUser } from '@/hooks/auth';

export default function Dashboard() {
    const [chatId, setChatId] = useState<number | undefined>();
    const { user } = useLocalStorageUser();
    const { data: oneToOneChatData } = useOneToOneChat();
    const { data: conversation } = useConversation(chatId);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [conversationTitle, setConversationTitle] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSendMessage = () => {
        sendMessageService({ content: message, receiverId: 5, senderId: 4 });
    };

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
                            fetchChat={(chatId: number, chatTitle: string) => {
                                setChatId(chatId);
                                setConversationTitle(chatTitle);
                            }}
                            chatMemberData={oneToOneChatData.data}
                        />
                    )}

                    {/* third container  */}
                    <Chat
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={onSendMessage}
                        conversationData={
                            conversation && conversation.data
                                ? conversation.data
                                : null
                        }
                        conversationTitle={conversationTitle}
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
}
