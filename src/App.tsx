import { ChatLayout } from './components/chat/chat-layout';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartingScreen from './components/startingScreen/startingScreen';

export interface Alert {
  userId: number;
  messagesUnread: number;
  timeLimit: number;
}

export enum GameStatus {
  STARTING_SCREEN,
  PLAYING,
  GAME_OVER,
}

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.STARTING_SCREEN);
  const [instructions, setInstructions] = useState<boolean | null>(null);

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
            className="flex justify-center p-24 overflow-x-hidden"
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
            <ChatLayout instructions={instructions} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
