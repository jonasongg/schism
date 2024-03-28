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
    prompt:
      "you am my friend. you're texting me to catch up. reply in an informal text-based way. avoid punctuation and capital letters,\
      include typos, and keep your messages short.",
    initial: ['hey wyd', 'i have sth to tell you'],
  },
  {
    userId: 2,
    prompt:
      "You are my very strict manager. You're texting me to question me about my recent performance at work \
      which has been disappointing of late. Reply in a professional manner and question me if I do not reply professionally.",
    initial: ['Hey You', 'Do you have a minute?'],
  },
  {
    userId: 3,
    prompt:
      "you're my best friend. you're texting me to gossip. reply in an informal text-based way. avoid punctuation and capital letters,\
      include typos, and keep your messages short.",
    initial: ['omg', 'guess who i saw today'],
  },
  {
    userId: 4,
    prompt: "You're my coworker that I dislike. You're texting me to ask about work.",
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
