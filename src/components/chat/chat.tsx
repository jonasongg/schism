import { Message, UserData } from '@/app/data';
import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import React from 'react';
import { Alert } from '@/App';

interface ChatProps {
  userData: UserData[];
  setUserData: React.Dispatch<React.SetStateAction<UserData[]>>;
  selectedUserId: number;
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  gameOver: boolean;
}

export function Chat({ userData, setUserData, selectedUserId, setAlerts, gameOver }: ChatProps) {
  const selectedUser = userData.find((user) => user.id === selectedUserId) ?? userData[0];
  const sendMessage = (newMessage: Message) => {
    setAlerts((prev) => prev.filter((alert) => alert.userId !== selectedUserId));
    setUserData(
      userData.map((user) =>
        user.id === selectedUserId ? { ...user, messages: [...(user.messages ?? []), newMessage] } : user,
      ),
    );
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList selectedUser={selectedUser} sendMessage={sendMessage} gameOver={gameOver} />
    </div>
  );
}
