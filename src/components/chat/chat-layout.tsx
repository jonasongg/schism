'use client';

import { useState } from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';
import { Alert } from '@/App';
import { UserData } from '@/app/data';

interface ChatLayoutProps {
  userData: UserData[];
  setUserData: React.Dispatch<React.SetStateAction<UserData[]>>;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ChatLayout({ userData, setUserData, alerts, setAlerts, gameOver, setGameOver }: ChatLayoutProps) {
  const [selectedUserId, setSelectedUserId] = useState(2);

  return (
    <>
      <Sidebar
        links={userData.map((user) => ({
          ...user,
          messages: user.messages ?? [],
          variant: selectedUserId === user.id ? 'secondary' : 'ghost',
        }))}
        setSelectedUserId={setSelectedUserId}
        alerts={alerts}
        setAlerts={setAlerts}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      <Chat
        userData={userData}
        setUserData={setUserData}
        selectedUserId={selectedUserId}
        setAlerts={setAlerts}
        gameOver={gameOver}
      />
    </>
  );
}
