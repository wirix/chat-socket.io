import { ChangeEvent, useEffect, useState } from 'react';
import styles from './app.module.css';
import { Card, IPost, Navbar } from './components';
import { io, Socket } from 'socket.io-client';

export const posts: IPost[] = [
  {
    id: 1,
    username: 'name1',
    fullName: 'fwef',
    userImg: 'https://www.swanirmanconsultancy.in/wp-content/uploads/2023/04/userimg.jpg',
    postImg: 'https://upload.wikimedia.org/wikipedia/commons/9/92/POST_P5KPL.jpg',
  },
  {
    id: 2,
    username: 'name2',
    fullName: 'strwfwing',
    userImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4A1jdWtsLG6UHjzPlLnfpTQ_fX-SbFTMKEemA6ewkJA&s',
    postImg:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Post_Holdings_logo.svg/1200px-Post_Holdings_logo.svg.png',
  },
];

export const App = () => {
  const [username, setUserName] = useState('');
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const onSetUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onSubmit = () => {
    setUser(username);
    setUserName('');
  };

  useEffect(() => {
    // const socket = io('http://localhost:5000');
    // console.log(socket.on('firstEvent', (msg) => {
    //   console.log(msg)
    // }));
    setSocket(io('http://localhost:5000'));
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit('newUser', user);
  }, [socket, user]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {user && socket ? (
          <>
            <span className={styles.userName}>{user}</span>
            <Navbar socket={socket} />
            {posts.map((p) => (
              <Card key={p.fullName} post={p} socket={socket} user={user} />
            ))}
          </>
        ) : (
          <form onSubmit={onSubmit} className={styles.login}>
            <input type="text" placeholder="username" onChange={onSetUserName} />
            <button>login</button>
          </form>
        )}
      </div>
    </div>
  );
};
