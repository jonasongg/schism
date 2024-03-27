'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';
import { Alert } from '@/App';
import { userData as userDataJson } from '@/app/data';
import { random, useRandomInterval } from '@/lib/useRandomInterval';
import { askChatGpt } from '@/lib/gpt';

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

  const receiveMessage = async () => {
    if (alerts.length >= userData.length) return;

    const getUserId = (): number => {
      const temp = random(1, userData.length + 1);
      return alerts.find((alert) => alert.userId === temp) == null ? temp : getUserId();
    };

    const userId = getUserId();

    const user = userData.find((user) => user.id === userId);
    if (user == null) return;

    const { name, messages } = user;
    const responses = await askChatGpt(
      userId,
      messages?.map((m) =>
        m.name === name ? { role: 'assistant', content: m.message } : { role: 'user', content: m.message },
      ) ?? [],
    );

    setUserData(
      userData.map((user) =>
        user.id === userId
          ? {
              ...user,
              messages: [
                ...(user.messages ?? []),
                ...responses.map((r) => ({ id: user.messages?.length ?? 0, name, message: r })),
              ],
            }
          : user,
      ),
    );
    setAlerts((prev) =>
      prev.find((alert) => alert.userId === userId)
        ? prev.map((alert) =>
            alert.userId === userId ? { ...alert, messagesUnread: alert.messagesUnread + responses.length } : alert,
          )
        : // 25 and 35
          [
            ...prev,
            { userId, messagesUnread: responses.length, timeLimit: random(925 - getScaling(10), 935 - getScaling(15)) },
          ],
    );
  };

  // 8000 and 15000
  const cancel = useRandomInterval(() => receiveMessage(), 3000, 3000, {
    getScaling,
    minSubtract: 2000,
    maxSubtract: 5000,
  });
  // cancel();
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
