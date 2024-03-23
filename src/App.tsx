import './App.css';
import { ChatLayout } from './components/chat/chat-layout';
import { userData as userDataJson } from '@/app/data';
import { random, useRandomInterval } from './lib/useRandomInterval';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartingScreen from './components/startingScreen/startingScreen';

export interface Alert {
  userId: number;
  messagesUnread: number;
}

export enum GameStatus {
  STARTING_SCREEN,
  PLAYING,
  GAME_OVER,
}

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.STARTING_SCREEN);

  const [userData, setUserData] = useState(userDataJson);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [instructions, setInstructions] = useState<boolean | null>(null);

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
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center gap-4">
      <AnimatePresence>
        {gameStatus === GameStatus.STARTING_SCREEN && (
          <motion.div
            key={GameStatus.STARTING_SCREEN}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center p-24"
          >
            <StartingScreen
              setGameStatus={setGameStatus}
              instructions={instructions}
              setInstructions={setInstructions}
            />
          </motion.div>
        )}

        {gameStatus === GameStatus.PLAYING && (
          <motion.div
            key={GameStatus.PLAYING}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute z-10 border rounded-lg max-w-5xl w-full h-3/4 text-sm lg:flex"
          >
            <ChatLayout {...{ userData, setUserData, alerts, setAlerts, gameOver, setGameOver }} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
