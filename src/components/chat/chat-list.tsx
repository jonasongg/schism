import { Message, UserData } from '@/app/data';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import ChatBottombar from './chat-bottombar';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatListProps {
  messages?: Message[];
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({ messages, selectedUser, sendMessage, isMobile }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div ref={messagesContainerRef} className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: Math.max(0, 10 - (messages.length - index)) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 whitespace-pre-wrap px-4',
                message.name !== selectedUser.name ? 'items-end' : 'items-start',

                // if this message is not from the same user as the previous one, add padding-top
                index === 0 || message.name !== messages[index - 1].name ? 'pt-3' : 'pt-0.5',

                // if this message is not from the same user as the next one, add padding-bottom
                index === messages.length - 1 || message.name !== messages[index + 1].name ? 'pb-3' : 'pb-0.5',
              )}
            >
              <span
                className={cn(
                  'py-2 px-2.5 rounded-2xl max-w-xs text-left',
                  message.name === selectedUser.name ? 'bg-accent rounded-bl-none' : 'bg-gray-300 rounded-br-none',
                  message.name !== selectedUser.name && index !== 0 && message.name === messages[index - 1].name
                    ? 'rounded-tr-none'
                    : '',
                  message.name === selectedUser.name && index !== 0 && message.name === messages[index - 1].name
                    ? 'rounded-tl-none'
                    : '',
                )}
              >
                {message.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
