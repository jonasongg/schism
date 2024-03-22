'use client';

import { userData as userDataJson } from '@/app/data';
import React from 'react';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';

export function ChatLayout() {
  const [userData, setUserData] = React.useState(userDataJson);
  const [selectedUserId, setSelectedUserId] = React.useState(0);

  return (
    <>
      <Sidebar
        links={userData.map((user) => ({
          ...user,
          messages: user.messages ?? [],
          variant: selectedUserId === user.id ? 'secondary' : 'ghost',
        }))}
        setSelectedUserId={setSelectedUserId}
      />
      <Chat userData={userData} setUserData={setUserData} selectedUserId={selectedUserId} />
    </>
  );
}
