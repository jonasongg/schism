import { Message, UserData } from '@/app/data';
import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import React, { useEffect, useState } from 'react';
import { Alert } from '@/App';
import { askChatGpt } from '@/lib/gpt';
import { useGlitch } from 'react-powerglitch';

interface ChatProps {
  userData: UserData[];
  setUserData: React.Dispatch<React.SetStateAction<UserData[]>>;
  selectedUserId: number | null;
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  gameOver: boolean;
  isNextAutocorrect: boolean;
  setIsNextAutocorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Chat({
  userData,
  setUserData,
  selectedUserId,
  setAlerts,
  gameOver,
  isNextAutocorrect,
  setIsNextAutocorrect,
}: ChatProps) {
  const selectedUser = userData.find((user) => user.id === selectedUserId) ?? userData[0];
  const sendMessage = (newMessage: Message) => {
    setAlerts((prev) => prev.filter((alert) => alert.userId !== selectedUserId));
    setUserData(
      userData.map((user) =>
        user.id === selectedUserId ? { ...user, messages: [...(user.messages ?? []), newMessage] } : user,
      ),
    );
  };

  const [autoCorrection, setAutoCorrection] = useState('');
  const [isAutoCorrecting, setIsAutoCorrecting] = useState(false);

  const glitch = useGlitch({
    playMode: 'manual',
    glitchTimeSpan: false,
    shake: {
      amplitudeX: 0.01,
      amplitudeY: 0.1,
    },
    slice: {
      maxHeight: 0.02,
      minHeight: 0.05,
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (isNextAutocorrect && selectedUserId != null) {
        setIsAutoCorrecting(true);
        glitch.startGlitch();
        const { messages, name } = userData.find((user) => user.id === selectedUserId) ?? {};
        const response = (
          await askChatGpt(
            selectedUserId,
            messages?.map((m) =>
              m.name === name ? { role: 'assistant', content: m.message } : { role: 'user', content: m.message },
            ) ?? [],
            true,
            controller.signal,
          )
        )[0];
        setIsAutoCorrecting(false);
        setIsNextAutocorrect(false);
        setAutoCorrection(response);
      }
    })();
    return () => controller.abort();
  }, [selectedUserId]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        gameOver={gameOver}
        autoCorrection={autoCorrection}
        setAutoCorrection={setAutoCorrection}
        isAutoCorrecting={isAutoCorrecting}
        glitch={glitch}
      />
    </div>
  );
}
