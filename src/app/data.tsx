export const userData: UserData[] = [
  {
    id: 1,
    avatar: '/User1.png',
    color: 'bg-slate-300',
    messages: [
      {
        id: 0,
        name: 'Jane Doe',
        message: 'Hey, Jakob',
      },
      {
        id: 1,
        name: 'Jane Doe',
        message: 'Hey, Jakob',
      },
      {
        id: 2,
        name: 'Jakob Hoeg',
        message: 'Hey!',
      },
      {
        id: 3,
        name: 'Jane Doe',
        message: 'How are you?',
      },
      {
        id: 4,
        name: 'Jakob Hoeg',
        message: 'I am good, you?',
      },
      {
        id: 5,
        name: 'Jane Doe',
        message: 'I am good too!',
      },
      {
        id: 6,
        name: 'Jakob Hoeg',
        message: 'That is good to hear!',
      },
      {
        id: 7,
        name: 'Jane Doe',
        message: 'How has your day been so far?',
      },
      {
        id: 8,
        name: 'Jakob Hoeg',
        message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
      },
      {
        id: 9,
        name: 'Jane Doe',
        message: 'I had a relaxing day. Just catching up on some reading.',
      },
    ],
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
