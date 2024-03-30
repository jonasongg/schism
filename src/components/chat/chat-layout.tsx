'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';
import { Alert, GameStatus } from '@/App';
import { userData as userDataJson } from '@/app/data';
import { random, useRandomInterval } from '@/lib/useRandomInterval';
import { askChatGpt } from '@/lib/gpt';

export function ChatLayout({
  instructions,
  setGameStatus,
}: {
  instructions: boolean | null;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}) {
  const [userData, setUserData] = useState(userDataJson);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [popUps, setPopUps] = useState<boolean[]>([false, false]);
  const [startTime, setStartTime] = useState<number | null>(null);

  const ALERT_TIME_LIMITS = [2, 10, 3, 15, 180];
  const TIME_BETWEEN_MULITPLE_SENDS = [1500, 3000];
  const TIMES_BETWEEN_MESSAGES = [900, 2000, 1200, 4000, 180];

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (gameOver) {
      setGameStatus(GameStatus.GAME_OVER);
    }
  }, [gameOver]);

  // helper functions

  // Assume max difficulty starts at 3 minutes
  const getScaling = (toScaleTo: number, maxInSec: number) =>
    startTime == null ? 0 : ((Date.now() - startTime) / (maxInSec * 1000)) * toScaleTo;

  const receiveMessage = async () => {
    const getUserId = (): number | null => {
      const currentLimit = Math.ceil(getScaling(userData.length, 240));
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
      if (response !== '<<end>>') {
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
            : [
                ...prev,
                {
                  userId,
                  messagesUnread: 1,
                  timeLimit: random(
                    ALERT_TIME_LIMITS[0] - getScaling(ALERT_TIME_LIMITS[1], ALERT_TIME_LIMITS[4]),
                    ALERT_TIME_LIMITS[2] - getScaling(ALERT_TIME_LIMITS[3], ALERT_TIME_LIMITS[4]),
                  ),
                },
              ],
        );
      }

      // maximum here should be smaller than minimum of receive message
      await new Promise((resolve) =>
        setTimeout(resolve, random(TIME_BETWEEN_MULITPLE_SENDS[0], TIME_BETWEEN_MULITPLE_SENDS[1])),
      );
    }
  };

  const cancel = useRandomInterval(() => receiveMessage(), TIMES_BETWEEN_MESSAGES[0], TIMES_BETWEEN_MESSAGES[2], {
    getScaling,
    minSubtract: TIMES_BETWEEN_MESSAGES[1],
    maxSubtract: TIMES_BETWEEN_MESSAGES[3],
    maxInSec: TIMES_BETWEEN_MESSAGES[4],
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
