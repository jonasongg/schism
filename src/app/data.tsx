export const userData: UserData[] = [
  {
    id: 1,
    avatar: '/User1.png',
    color: 'bg-slate-300',
    name: 'The Friend',
  },
  {
    id: 2,
    avatar: '/User2.png',
    color: 'bg-teal-300',
    name: 'The Manager',
  },
  {
    id: 3,
    avatar: '/User3.png',
    color: 'bg-orange-200',
    name: 'The Best Friend',
  },
  {
    id: 4,
    color: 'bg-stone-400',
    avatar: '/User4.png',
    name: 'The Coworker',
  },
];

export const initialMessages = Object.freeze([
  {
    userId: 1,
    prompt: "i am your friend. i'm texting you to catch up.",
    initial: ['hey wyd', 'i have sth to tell you'],
  },
  {
    userId: 2,
    prompt: "I am your manager. I'm texting you to question your recent behavior.",
    initial: ['Hey You', 'Do you have a minute?'],
  },
  {
    userId: 3,
    prompt: "i'm your best friend. i'm texting you to gossip.",
    initial: ['omg', 'guess who i saw today'],
  },
  {
    userId: 4,
    prompt: "i'm your coworker that you dislike. i'm texting you to ask about work.",
    initial: ['Hey', 'Can you help me with this?'],
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
