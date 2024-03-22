import { Message, UserData } from '@/app/data';
import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import React from 'react';

interface ChatProps {
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ selectedUser, isMobile }: ChatProps) {
  const sendMessage = (newMessage: Message) => {
    // setSelectedUser({ ...selectedUser, messages: [...(selectedUser.messages ?? []), newMessage] });
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList selectedUser={selectedUser} sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
