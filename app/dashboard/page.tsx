'use client';
import styles from './page.module.css';
import Search from '@/components/ui/search/search';
import { useState } from 'react';
import { DashNav } from '@/components/dashnav/dashnav';
import { DashManager } from '@/components/dashmanager/dashmanager';
import { Chat } from '@/components/chat/chat';
import { sendMessageService } from '@/services/chat';

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSendMessage = () => {
        sendMessageService({ content: message, receiverId: 5, senderId: 4 });
    };

    return (
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
                <DashManager />

                {/* third container  */}
                <Chat
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={onSendMessage}
                />
            </div>
        </div>
    );
}
