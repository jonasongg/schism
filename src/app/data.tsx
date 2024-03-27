export const userData: UserData[] = [
  {
    id: 1,
    avatar: '/User1.png',
    color: 'bg-slate-300',
    messages: [],
    name: 'Jane Doe',
  },
  {
    id: 2,
    avatar: '/User2.png',
    color: 'bg-teal-300',
    name: 'John Doe',
  },
  {
    id: 3,
    avatar: '/User3.png',
    color: 'bg-orange-200',
    name: 'Elizabeth Smith',
  },
  {
    id: 4,
    color: 'bg-stone-400',
    avatar: '/User4.png',
    name: 'John Smith',
  },
];

export const initialMessages = Object.freeze([
  {
    userId: 1,
    initial: ['hey wyd', 'i have sth to tell you'],
  },
]);

export type UserData = {
  id: number;
  avatar: string;
  color: string;
  messages?: Message[];
  name: string;
};

export const loggedInUserData = {
  id: 5,
  avatar: '/LoggedInUser.jpg',
  name: 'Jakob Hoeg',
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
