import React from 'react';
import styles from './ChatList.module.css';

const chats = [
  {
    name: '♡♡강이 여보♡♡',
    message: '[6월 임산부요가]',
    time: '오전 9:43',
    unread: 0,
  },
  {
    name: '모딩',
    message: '말하이야 시바ㅠㅠ',
    time: '오후 12:23',
    unread: 0,
  },
  {
    name: '리경화이',
    message: 'ㄷㄷ 왜요 ㅠㅠ',
    time: '오전 11:55',
    unread: 0,
  },
  {
    name: '카카오메이커스',
    message: '(광고) 귀걸이처럼 붙이면 부기 싹ㅇㅇ',
    time: '오전 8:34',
    unread: 1,
  },
    {
    name: '카카오메이커스',
    message: '(광고) 귀걸이처럼 붙이면 부기 싹ㅇㅇ',
    time: '오전 8:34',
    unread: 1,
  },
];

function ChatList() {
  return (
    <div className={styles.chatList}>
      {chats.map((chat, idx) => (
        <div key={idx} className={styles.chatItem}>
          <div className={styles.avatar}>👤</div>
          <div className={styles.chatContent}>
            <div className={styles.chatHeader}>
              <span className={styles.name}>{chat.name}</span>
              <span className={styles.time}>{chat.time}</span>
            </div>
            <div className={styles.chatMessage}>
              <span>{chat.message}</span>
              {chat.unread > 0 && (
                <span className={styles.unread}>{chat.unread}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
