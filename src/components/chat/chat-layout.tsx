'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';
import { Alert, GameStatus } from '@/App';
import { userData as userDataJson } from '@/app/data';
import { getCurrentLimit, getScaling, random, useRandomInterval } from '@/lib/useRandomInterval';
import { askChatGpt } from '@/lib/gpt';
import ReactHowler from 'react-howler';

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
  const [isPing, setIsPing] = useState(false);

  const ALERT_TIME_LIMITS = [30, 10, 35, 15, 180];
  const TIME_BETWEEN_MULITPLE_SENDS = [1000, 2000];
  const TIMES_BETWEEN_MESSAGES = [8000, 3000, 11000, 4000, 180];
  const TIMES_BETWEEN_AUTOCORRECTS = [150_000, 180_000];
  const SCALING_WITH_NUMBER_OF_CHATS = [1.5, 2];

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (gameOver) {
      setGameStatus(GameStatus.GAME_OVER);
    }
  }, [gameOver]);

  const receiveMessage = async () => {
    const getUserId = (): number | null => {
      if (alerts.length >= getCurrentLimit(startTime ?? Date.now())) return null;

      const temp = random(1, getCurrentLimit(startTime ?? Date.now()) + 1);
      return alerts.find((alert) => alert.userId === temp) == null ? temp : getUserId();
    };
    console.log('chat-layout', getCurrentLimit(startTime ?? Date.now()));

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
      // if (!response.includes('<<end>>')) {
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
                  ALERT_TIME_LIMITS[0] -
                    getScaling(ALERT_TIME_LIMITS[1], ALERT_TIME_LIMITS[4], startTime ?? Date.now()),
                  ALERT_TIME_LIMITS[2] -
                    getScaling(ALERT_TIME_LIMITS[3], ALERT_TIME_LIMITS[4], startTime ?? Date.now()),
                ),
              },
            ],
      );
      setIsPing(true);
      // }

      // maximum here should be smaller than minimum of receive message
      await new Promise((resolve) =>
        setTimeout(resolve, random(TIME_BETWEEN_MULITPLE_SENDS[0], TIME_BETWEEN_MULITPLE_SENDS[1])),
      );
    }
  };

  const cancelMessages = useRandomInterval(receiveMessage, TIMES_BETWEEN_MESSAGES[0], TIMES_BETWEEN_MESSAGES[2], {
    minSubtract: TIMES_BETWEEN_MESSAGES[1] + SCALING_WITH_NUMBER_OF_CHATS[0],
    maxSubtract: TIMES_BETWEEN_MESSAGES[3] + SCALING_WITH_NUMBER_OF_CHATS[1],
    maxInSec: TIMES_BETWEEN_MESSAGES[4],
    startTime: Date.now(),
  });

  const [isNextAutocorrect, setIsNextAutocorrect] = useState(false);
  const cancelRandomAutocorrect = useRandomInterval(
    () => setIsNextAutocorrect(true),
    TIMES_BETWEEN_AUTOCORRECTS[0],
    TIMES_BETWEEN_AUTOCORRECTS[1],
  );

  if (gameOver) {
    cancelMessages();
    cancelRandomAutocorrect();
  }

  return (
    <>
      <ReactHowler src="ping.mp3" playing={isPing} onEnd={() => setIsPing(false)} />
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
          isNextAutocorrect={isNextAutocorrect}
          setIsNextAutocorrect={setIsNextAutocorrect}
        />
      ) : (
        <span className="flex justify-center items-center w-full text-gray-500">No chat selected</span>
      )}
    </>
  );
}
