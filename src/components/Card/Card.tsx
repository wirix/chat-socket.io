import { useState } from 'react';
import styles from './Card.module.css';
import { Socket } from 'socket.io-client';

export interface IPost {
  id: number;
  username: string;
  fullName: string;
  userImg: string;
  postImg: string;
}

export const Card = ({ post, socket, user }: { post: IPost; socket: Socket; user: string }) => {
  const [liked, setLiked] = useState(false);

  const onNotifClick = (type: number) => {
    setLiked((prev) => !prev);
    console.log({
      senderName: user,
      receiveName: post.username,
      type,
    });
    socket.emit('sendNotification', {
      senderName: user,
      receiveName: post.username,
      type,
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <img className={styles.userImg} src={post.userImg} alt="" />
        <span>{post.fullName}</span>
      </div>
      <img className={styles.postImg} src={post.postImg} alt="" />

      <div className={styles.interaction}>
        <span className={styles.cardIcon} onClick={() => onNotifClick(1)}>
          {liked ? <i className="ri-heart-fill"></i> : <i className="ri-heart-line"></i>}
        </span>
        <span className={styles.cardIcon} onClick={() => onNotifClick(2)}>
          <i className="ri-message-fill"></i>
        </span>
        <span className={styles.cardIcon} onClick={() => onNotifClick(3)}>
          <i className="ri-share-line"></i>
        </span>
        <span className={`${styles.cardIcon} ${styles.infoIcon}`}>
          <i className="ri-information-line"></i>
        </span>
      </div>
    </div>
  );
};
