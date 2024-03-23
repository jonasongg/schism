import './App.css';
import { ChatLayout } from './components/chat/chat-layout';
import { userData as userDataJson } from '@/app/data';
import { random, useRandomInterval } from './lib/useRandomInterval';
import { useState } from 'react';

export interface Alert {
  userId: number;
  messagesUnread: number;
}

function App() {
  const [userData, setUserData] = useState(userDataJson);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [gameOver, setGameOver] = useState(false);
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

  // const cancel = useRandomInterval(() => receiveMessage(getRandomUser(), 'test'), 100, 200);
  // if (gameOver) cancel();

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <ChatLayout {...{ userData, setUserData, alerts, setAlerts, gameOver, setGameOver }} />
      </div>
    </main>
  );
}

export default App;
