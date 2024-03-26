'use client';

import { useEffect, useState } from 'react';
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
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  if (gameOver) {
    console.log('Game Over!');
  }

  // helper functions

  // Assume max difficulty starts at 1 minutes
  const getScaling = (toScaleTo: number) => (startTime == null ? 0 : ((Date.now() - startTime) / 60000) * toScaleTo);

  const getRandomUser = () => random(1, userData.length + 1);

  const receiveMessage = (userId: number, message: string) => {
    const name = userData.find((user) => user.id === userId)?.name ?? '';

    setUserData(
      userData.map((user) =>
        user.id === userId
          ? {
              ...user,
              messages: [...(user.messages ?? []), { id: user.messages?.length ?? 0, name, message }],
            }
          : user,
      ),
    );
    setAlerts((prev) =>
      prev.find((alert) => alert.userId === userId)
        ? prev.map((alert) =>
            alert.userId === userId ? { ...alert, messagesUnread: alert.messagesUnread + 1 } : alert,
          )
        : [...prev, { userId, messagesUnread: 1, timeLimit: random(25 - getScaling(10), 35 - getScaling(15)) }],
    );
  };

  const cancel = useRandomInterval(() => receiveMessage(getRandomUser(), 'test'), 8000, 15000, {
    getScaling,
    minSubtract: 2000,
    maxSubtract: 5000,
  });
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
