'use client';

import { userData as userDataJson } from '@/app/data';
import { useEffect, useState } from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';

export interface Alert {
  userId: number;
  messagesUnread: number;
}

export function ChatLayout() {
  const [userData, setUserData] = useState(userDataJson);
  const [selectedUserId, setSelectedUserId] = useState(2);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [gameOver, setGameOver] = useState(false);
  if (gameOver) {
    console.log('Game Over!');
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserData(
        userData.map((user) =>
          user.id === 1
            ? {
                ...user,
                messages: [
                  ...(user.messages ?? []),
                  { id: 10, name: 'Jane Doe', message: 'I am going to bed now. Good night!' },
                ],
              }
            : user,
        ),
      );
      setAlerts((prev) => {
        const alert = prev.find((alert) => alert.userId === 1);
        if (alert) {
          return prev.map((alert) =>
            alert.userId === 1 ? { ...alert, messagesUnread: alert.messagesUnread + 1 } : alert,
          );
        }
        return [...prev, { userId: 1, messagesUnread: 1 }];
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Sidebar
        links={userData.map((user) => ({
          ...user,
          messages: user.messages ?? [],
          variant: selectedUserId === user.id ? 'secondary' : 'ghost',
        }))}
        setSelectedUserId={setSelectedUserId}
        alerts={alerts}
        setAlerts={setAlerts}
        setGameOver={setGameOver}
      />
      <Chat userData={userData} setUserData={setUserData} selectedUserId={selectedUserId} setAlerts={setAlerts} />
    </>
  );
}
