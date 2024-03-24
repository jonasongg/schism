'use client';

import { useState } from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';
import { Alert } from '@/App';
import { userData as userDataJson } from '@/app/data';
import { random, useRandomInterval } from '@/lib/useRandomInterval';

export function ChatLayout({ instructions }: { instructions: boolean | null }) {
  const [userData, setUserData] = useState(userDataJson);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [popUps, setPopUps] = useState<boolean[]>([false]);

  if (gameOver) {
    console.log('Game Over!');
  }

  const receiveMessage = (userId: number, message: string) => {
    const name = userData.find((user) => user.id === userId)?.name;

    setUserData(
      userData.map((user) =>
        user.id === userId
          ? {
              ...user,
              messages: [...(user.messages ?? []), { id: user.messages?.length ?? 0, name: name ?? '', message }],
            }
          : user,
      ),
    );
    setAlerts((prev) => {
      const alert = prev.find((alert) => alert.userId === userId);
      if (alert) {
        return prev.map((alert) =>
          alert.userId === userId ? { ...alert, messagesUnread: alert.messagesUnread + 1 } : alert,
        );
      }
      return [...prev, { userId, messagesUnread: 1 }];
    });
  };

  const getRandomUser = () => random(1, userData.length + 1);

  const cancel = useRandomInterval(() => receiveMessage(getRandomUser(), 'test'), 1000, 2000);
  if (gameOver) cancel();

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
        gameOver={gameOver}
        setGameOver={setGameOver}
        popUps={popUps}
        setPopUps={setPopUps}
        instructions={instructions}
      />
      <Chat
        userData={userData}
        setUserData={setUserData}
        selectedUserId={selectedUserId}
        setAlerts={setAlerts}
        gameOver={gameOver}
      />
    </>
  );
}
