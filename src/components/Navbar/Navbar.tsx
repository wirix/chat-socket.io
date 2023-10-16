import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Socket } from 'socket.io-client';

interface INotif {
  senderName: string;
  type: number;
}

export const Navbar = ({ socket }: { socket: Socket }) => {
  const [notifications, setNotifications] = useState<INotif[]>([]);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      setNotifications((prev: any) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }: INotif) => {
    let action;

    if (type === 1) {
      action = 'liked';
    } else if (type === 2) {
      action = 'commented';
    } else {
      action = 'shared';
    }
    return <span className={styles.notifications}>{`${senderName} ${action}_your post`}</span>;
  };

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
      <div>{notifications.map((n) => displayNotification(n))}</div>
    </div>
  );
};
