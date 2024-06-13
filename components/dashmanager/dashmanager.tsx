'use client';
import styles from './dashmanager.module.css';
import Image from 'next/image';
import { FiMessageCircle } from 'react-icons/fi';
import { LuUsers } from 'react-icons/lu';
import { IoMdArrowDropright } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';
import { IOneToOneChat } from '@/interfaces/chat';
import { useLocalStorageUser } from '@/hooks/auth';

const names = [
    'Muhammad Bilal Khan',
    'Muhammad Shoaib Khan',
    'Muhammad Riaz Khan'
];

export const DashManager = ({
    chatMemberData,
    fetchChat
}: {
    chatMemberData: IOneToOneChat[];
    fetchChat: (chatId: number, chatTitle: string, receiver_id: number) => void;
}) => {
    const { user } = useLocalStorageUser();
    const [collapsedGroups, setCollapsedGroups] = useState(true);
    const [collapsedDirectMessages, setCollapsedDirectMessages] =
        useState(true);

    const toggleCollapseGroups = () => {
        setCollapsedGroups(!collapsedGroups);
    };

    const toggleCollapseMessages = () => {
        setCollapsedDirectMessages(!collapsedDirectMessages);
    };
    return (
        <div className={styles.managerContainer}>
            <p className={styles.managerHeading}>QLU Recruiting</p>
            <div className={styles.firstContainer}>
                <div className={styles.firstChildContainer}>
                    <div>
                        <LuUsers />
                    </div>
                    <p>Groups</p>
                </div>
                <div className={styles.firstChildContainer}>
                    <div>
                        <FiMessageCircle />
                    </div>
                    <p>Direct Messages</p>
                </div>
            </div>

            <div className="">
                <div
                    className={styles.collapseTrigger}
                    onClick={toggleCollapseGroups}
                >
                    <div>
                        {collapsedGroups ? (
                            <IoMdArrowDropright size={25} />
                        ) : (
                            <IoMdArrowDropdown size={25} />
                        )}
                    </div>
                    <p>Groups</p>
                </div>
                <div
                    className={
                        collapsedGroups
                            ? styles.collapsedContent
                            : styles.expandedContent
                    }
                >
                    {names.map((name, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '0.5rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <Image
                                src={'/images/dummy3.jpeg'}
                                alt="dummy3"
                                height={35}
                                width={35}
                                style={{ borderRadius: '50%' }}
                            />
                            <p>{name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="">
                <div
                    className={styles.collapseTrigger}
                    onClick={toggleCollapseMessages}
                >
                    <div>
                        {collapsedDirectMessages ? (
                            <IoMdArrowDropright size={25} />
                        ) : (
                            <IoMdArrowDropdown size={25} />
                        )}
                    </div>
                    <p>Direct Messages</p>
                </div>
                <div
                    className={
                        collapsedDirectMessages
                            ? styles.collapsedContent
                            : styles.expandedContent
                    }
                >
                    {chatMemberData &&
                        chatMemberData.length > 0 &&
                        chatMemberData.map((chat, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '0.5rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                                className={styles.namesRender}
                                onClick={() =>
                                    fetchChat(
                                        chat.id,
                                        chat.receiver_id === user?.id
                                            ? chat.sender_name
                                            : chat.receiver_name,
                                        chat.receiver_id === user?.id
                                            ? chat.sender_id
                                            : chat.receiver_id
                                    )
                                }
                            >
                                <Image
                                    src={'/images/dummy3.jpeg'}
                                    alt="dummy3"
                                    height={35}
                                    width={35}
                                    style={{ borderRadius: '50%' }}
                                />
                                <p>
                                    {chat.receiver_id === user?.id
                                        ? chat.sender_name
                                        : chat.receiver_name}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
