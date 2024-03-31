import { FileImage, Paperclip, SendHorizontal, ThumbsUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Message, loggedInUserData } from '@/app/data';
import { Textarea } from '../ui/textarea';
import { EmojiPicker } from '../emoji-picker';
import { random } from '@/lib/useRandomInterval';

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  gameOver: boolean;
  autoCorrection: string;
  setAutoCorrection: React.Dispatch<React.SetStateAction<string>>;
  isAutoCorrecting: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage,
  gameOver,
  autoCorrection,
  setAutoCorrection,
  isAutoCorrecting,
}: ChatBottombarProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      message: '👍',
    };
    sendMessage(newMessage);
    setMessage('');
  };

  const handleSend = (imperativeMessage: string = message) => {
    if (imperativeMessage.trim()) {
      const newMessage: Message = {
        id: imperativeMessage.length + 1,
        name: loggedInUserData.name,
        message: imperativeMessage.trim(),
      };
      sendMessage(newMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + '\n');
    }
  };

  useEffect(() => {
    (async () => {
      if (autoCorrection) {
        for (const c of autoCorrection) {
          setMessage((prev) => prev + c);
          await new Promise((resolve) => setTimeout(resolve, random(50, 200)));
        }
        handleSend(autoCorrection);
        setAutoCorrection('');
      }
    })();
  }, [autoCorrection]);

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-10 resize-none overflow-hidden bg-background"
            disabled={gameOver || isAutoCorrecting || !!autoCorrection}
            autoFocus
            onBlur={() => inputRef.current && inputRef.current.focus()}
          />
          <div className="absolute right-2 bottom-1.5  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                // if (inputRef.current) {
                //   inputRef.current.focus();
                // }
              }}
              disabled={gameOver}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0',
            )}
            onClick={() => handleSend()}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </a>
        ) : (
          <button
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0',
            )}
            onClick={handleThumbsUp}
            disabled={gameOver}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
