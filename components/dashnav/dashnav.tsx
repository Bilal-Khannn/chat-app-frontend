import styles from './dashnav.module.css';
import Image from 'next/image';
import { FiHome } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiMessageCircle } from 'react-icons/fi';
import { IoIosMore } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';

export const DashNav = () => {
    return (
        <div className={styles.navContainer}>
            <div className={styles.topContainer}>
                <Image
                    src={'/images/dummy1.png'}
                    alt="Dummy image 1"
                    height={35}
                    width={35}
                />
                <div className={styles.iconStyles}>
                    <FiHome />
                </div>
                <div className={styles.iconStyles}>
                    <IoMdNotificationsOutline />
                </div>
                <div className={styles.iconStyles}>
                    <FiMessageCircle />
                </div>
                <div className={styles.iconStyles}>
                    <IoIosMore />
                </div>
            </div>
            <div className={styles.botContainer}>
                <div className={styles.iconStyles}>
                    <IoMdAdd />
                </div>
                <Image
                    src={'/images/dummy2.jpeg'}
                    alt="Dummy image 1"
                    height={35}
                    width={35}
                />
            </div>
        </div>
    );
};
