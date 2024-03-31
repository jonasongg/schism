import { ChatLayout } from './components/chat/chat-layout';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import StartingScreen from './components/startingScreen/startingScreen';
import EndingScreen from './components/endingScreen/endingScreen';

export interface Alert {
  userId: number;
  messagesUnread: number;
  timeLimit: number;
}

export enum GameStatus {
  STARTING_SCREEN,
  PLAYING,
  GAME_OVER,
  REVIEW,
}

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.STARTING_SCREEN);
  const [instructions, setInstructions] = useState<boolean | null>(null);

  const controls = useAnimationControls();
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING || gameStatus === GameStatus.REVIEW) {
      controls.start({ opacity: 1 });
    }
    if (gameStatus === GameStatus.GAME_OVER) {
      controls.start({ opacity: 0.3 });
    }
  }, [gameStatus]);

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

        {gameStatus !== GameStatus.STARTING_SCREEN && (
          <motion.div
            key={GameStatus.PLAYING}
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ delay: 1, duration: 1.2 }}
            className="absolute border rounded-lg max-w-5xl w-full h-3/4 text-sm lg:flex z-10"
          >
            <ChatLayout instructions={instructions} setGameStatus={setGameStatus} />
          </motion.div>
        )}

        {gameStatus === GameStatus.GAME_OVER && (
          <motion.div
            key={GameStatus.STARTING_SCREEN}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 1.2 } }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="flex justify-center p-24 overflow-x-hidden z-20"
          >
            <EndingScreen setGameStatus={setGameStatus} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
