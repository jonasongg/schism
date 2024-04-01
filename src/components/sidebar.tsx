'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Message, UserData } from '@/app/data';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert } from '@/App';
import { Card } from './ui/card';
import ProgressBar from './progressBar';

interface SidebarProps {
  links: ({
    messages: Message[];
    variant: 'secondary' | 'ghost';
  } & UserData)[];
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  popUps: boolean[];
  setPopUps: React.Dispatch<React.SetStateAction<boolean[]>>;
  instructions: boolean | null;
}

export function Sidebar({
  links,
  setSelectedUserId,
  alerts,
  setAlerts,
  gameOver,
  setGameOver,
  popUps,
  setPopUps,
  instructions,
}: SidebarProps) {
  return (
    <div className="relative group flex flex-col h-full gap-4 p-2 border-r">
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({links.filter((link) => link.messages.length > 0).length})</span>
        </div>
      </div>

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto overflow-x-hidden">
        {links
          .filter((link) => link.messages.length > 0)
          .map((link, index) => {
            const alert = alerts.find((alert) => alert.userId === link.id);

            return (
              <motion.button
                key={index}
                className={cn(
                  buttonVariants({ variant: link.variant, size: 'lg' }),
                  link.variant === 'ghost' && 'hover:bg-gray-500/5',
                  link.variant === 'secondary' &&
                    'bg-gray-500/10 hover:bg-gray-400/10 dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                  'relative justify-start px-3.5',
                )}
                // initial={{ width: '40px' }}
                // animate={{ width: '100%', transition: { duration: 0.3, ease: easeIn } }}
                onClick={() => {
                  setSelectedUserId(link.id);
                  setAlerts((prev) =>
                    prev.map((alert) => (alert.userId === link.id ? { ...alert, messagesUnread: 0 } : alert)),
                  );
                }}
              >
                {instructions && (
                  <AnimatePresence>
                    {!popUps[0] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 5 } }}
                        onAnimationComplete={() =>
                          setPopUps((prev) => {
                            const newPopUps = [...prev];
                            newPopUps[0] = true;
                            return newPopUps;
                          })
                        }
                        className="fixed -translate-x-[17rem] w-56 text-wrap font-normal"
                      >
                        <Card className="p-3 cursor-default">
                          You received a message. Reply to it <strong>appropriately</strong>.
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {alert && (
                  <ProgressBar
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    popUps={popUps}
                    setPopUps={setPopUps}
                    timeLimit={alert.timeLimit}
                  />
                )}

                <Avatar className="flex justify-center items-center overflow-visible mr-4">
                  {!!alert?.messagesUnread && (
                    // Badge
                    <span
                      className={cn(
                        'bg-red-600 absolute w-5 h-5 -top-1 -left-1 rounded-full text-white z-0',
                        !gameOver &&
                          'after:absolute after:bg-red-600 after:inset-0 after:rounded-full after:animate-ping after:z-[-1]',
                      )}
                    >
                      {alert?.messagesUnread}
                    </span>
                  )}
                  <AvatarImage src={link.avatar} alt={link.avatar} width={6} height={6} className="w-10 h-10 " />
                  <AvatarFallback className="text-2xl border-solid border-black border-2">
                    {link.name.charAt(4)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-left">{link.name}</span>
                  {link.messages.length > 0 && (
                    <span className="text-zinc-300 text-xs w-48 truncate text-left">
                      {/* {link.messages[link.messages.length - 1].name.split(' ')[0]}:{' '} */}
                      {link.messages[link.messages.length - 1].message}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
      </nav>
    </div>
  );
}
