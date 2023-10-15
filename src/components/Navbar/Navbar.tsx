import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Socket } from 'socket.io-client';

export const Navbar = ({ socket }: { socket: Socket }) => {
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      setNotifications((prev: any) => [...prev, data]);
    });
  }, [socket]);
  
  console.log(notifications)

  return (
    <div className={styles.navber}>
      <span>logo</span>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <div className={styles.iconImg}>
            <i className="ri-notification-2-line"></i>
          </div>
          <div className={styles.counter}>2</div>
        </div>
      </div>
    </div>
  );
};
