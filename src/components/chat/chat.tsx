import { Message, UserData } from '@/app/data';
import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import React from 'react';

interface ChatProps {
  userData: UserData[];
  setUserData: React.Dispatch<React.SetStateAction<UserData[]>>;
  selectedUserId: number;
  setAlertingUsers: React.Dispatch<React.SetStateAction<number[]>>;
}

export function Chat({ userData, setUserData, selectedUserId, setAlertingUsers }: ChatProps) {
  const selectedUser = userData.find((user) => user.id === selectedUserId) ?? userData[0];
  const sendMessage = (newMessage: Message) => {
    setAlertingUsers((prev) => prev.filter((id) => id !== selectedUserId));
    setUserData(
      userData.map((user) =>
        user.id === selectedUserId ? { ...user, messages: [...(user.messages ?? []), newMessage] } : user,
      ),
    );
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList selectedUser={selectedUser} sendMessage={sendMessage} />
    </div>
  );
}
