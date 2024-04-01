import { cn } from '@/lib/utils';
import { AnimatePresence, motion, TargetAndTransition, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Card } from './ui/card';
import { useState } from 'react';
import ReactHowler from 'react-howler';

interface ProgressBarProps {
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  popUps: boolean[];
  setPopUps: React.Dispatch<React.SetStateAction<boolean[]>>;
  timeLimit: number;
}

const ProgressBar = ({ gameOver, setGameOver, popUps, setPopUps, timeLimit }: ProgressBarProps) => {
  const [flashing, setFlashing] = useState(false);
  const [tickVolume, setTickVolume] = useState<number | null>(null);

  const progress = useMotionValue(0);
  useMotionValueEvent(progress, 'change', (latest) => {
    setTickVolume(Math.min(0.8, latest * 3));
    if (latest >= 0.75 && !flashing) setFlashing(true);
  });

  return (
    <>
      <ReactHowler src="tiktok.mp3" playing={tickVolume != null} volume={tickVolume ?? 0} loop />
      <AnimatePresence>
        {!gameOver && (
          <motion.div
            key="progress-bar"
            className={cn('absolute bg-red-400 inset-0 z-[-1] rounded-md w-0 opacity-0', flashing && 'animate-pulse')}
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: 1,
              width: '100%',
              transition: {
                duration: timeLimit * 0.7,
                delay: timeLimit * 0.3,
                ease: 'easeOut',
              },
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={(definition) => {
              if ((definition as TargetAndTransition).opacity && !gameOver) setGameOver(true);
            }}
            style={{ opacity: progress }}
          />
        )}
        {!popUps[1] && (
          <motion.div
            key="progress-bar-pop-up"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: timeLimit * 0.3 } }}
            exit={{ opacity: 0, transition: { delay: 5 } }}
            onAnimationComplete={() =>
              setPopUps((prev) => {
                const newPopUps = [...prev];
                newPopUps[1] = true;
                return newPopUps;
              })
            }
            className="fixed -translate-x-[17rem] w-56 text-wrap font-normal"
          >
            <Card className="p-3 cursor-default">
              This red bar indicates the time you have to reply to this message. Once it runs out, it's{' '}
              <strong>game over</strong>!
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProgressBar;
