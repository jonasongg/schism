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
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
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

  // Assume max difficulty starts at 3 minutes
  const getScaling = (toScaleTo: number, maxInSec: number) =>
    startTime == null ? 0 : ((Date.now() - startTime) / (maxInSec * 1000)) * toScaleTo;

  const receiveMessage = async () => {
    const getUserId = (): number | null => {
      const currentLimit = Math.ceil(getScaling(userData.length, 120));
      if (alerts.length >= currentLimit) return null;

      const temp = random(1, currentLimit + 1);
      return alerts.find((alert) => alert.userId === temp) == null ? temp : getUserId();
    };

    const userId = getUserId();
    if (userId == null) return;

    const user = userData.find((user) => user.id === userId);
    if (user == null) return;

    const { name, messages } = user;
    const responses = await askChatGpt(
      userId,
      messages?.map((m) =>
        m.name === name ? { role: 'assistant', content: m.message } : { role: 'user', content: m.message },
      ) ?? [],
    );

    for (const response of responses) {
      setUserData((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                messages: [...(user.messages ?? []), { id: user.messages?.length ?? 0, name, message: response }],
              }
            : user,
        ),
      );
      setAlerts((prev) =>
        prev.find((alert) => alert.userId === userId)
          ? prev.map((alert) =>
              alert.userId === userId ? { ...alert, messagesUnread: alert.messagesUnread + 1 } : alert,
            )
          : // 25 and 35
            [
              ...prev,
              { userId, messagesUnread: 1, timeLimit: random(25 - getScaling(10, 180), 35 - getScaling(15, 180)) },
            ],
      );

      // maximum here should be smaller than minimum of receive message
      await new Promise((resolve) => setTimeout(resolve, random(1500, 3000)));
    }
  };

  // 6000 and 12000
  const cancel = useRandomInterval(() => receiveMessage(), 3000, 3000, {
    getScaling,
    minSubtract: 2000,
    maxSubtract: 5000,
    maxInSec: 180,
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
      {selectedUserId != null ? (
        <Chat
          userData={userData}
          setUserData={setUserData}
          selectedUserId={selectedUserId}
          setAlerts={setAlerts}
          gameOver={gameOver}
        />
      ) : (
        <span className="flex justify-center items-center w-full text-gray-500">No chat selected</span>
      )}
    </>
  );
}
