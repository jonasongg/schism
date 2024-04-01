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
  {
    id: 5,
    color: 'bg-slate-300',
    name: 'The Mother',
  },
  {
    id: 6,
    color: 'bg-teal-300',
    name: 'The Older Sister',
  },
  {
    id: 7,
    color: 'bg-orange-200',
    name: 'The Younger Brother',
  },
  {
    id: 8,
    color: 'bg-stone-400',
    name: "The Doctor's Appointment",
  },
];

export const initialMessages = Object.freeze([
  {
    userId: 1,
    prompt:
      "you am my friend. you're texting me to catch up. also talk about your new dog that you just adopted.\
      reply in an informal text-based way. avoid punctuation and capital letters,\
      include typos, and keep your messages short.",
    initial: ['hey wyd', 'long time no seee', 'how have you been?'],
  },
  {
    userId: 2,
    prompt:
      "You are my extremely strict and stern manager. You're texting me to question me about my recent performance at work \
      which has been disappointing of late. Specifically, for the latest marketing project, there were delays that were not entirely\
      my fault, but you're still blaming me. Call me out if I do not reply professionally, my reply seems informal, or I use slang\
      or improper English or punctation. Show no empathy and be extremely critical.",
    initial: ['Hey.', 'Do you have a minute?'],
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
    prompt:
      "You're my coworker that I dislike. You're texting me to ask about work. Be insistent on getting a reply and be slightly\
    annoying.",
    initial: ['Hi', 'Can you help me with this?'],
  },
  {
    userId: 5,
    prompt:
      "You're my mom. You're texting me to chide me for not calling you in a while. Be stern and slightly passive-aggressive.",
    initial: ['Hi', 'How was your day?'],
  },
  {
    userId: 6,
    prompt:
      "You're my elder sister. You're texting me to ask me if I want to go out for dinner and go shopping for clothes. And also\
      to buy a mother's day present.",
    initial: ['hey', 'do you want to go out for dinner?'],
  },
  {
    userId: 7,
    prompt: "You're my younger brother. You're texting me to ask me about advice on how to approach a girl.",
    initial: ['hey', 'you remember that job application', 'that you helped me with?'],
  },
  {
    userId: 8,
    prompt: "You're my doctor's receptionist. You're texting me to follow up on a call that I made earlier.",
    initial: ['Hi!', 'You made a call earlier? Sorry for missing it.', 'How can I help you?'],
  },
]);

export type UserData = {
  id: number;
  avatar?: string;
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
