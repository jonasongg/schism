'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Message, UserData } from '@/app/data';

interface SidebarProps {
  links: ({
    messages: Message[];
    variant: 'secondary' | 'ghost';
  } & UserData)[];
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
}

export function Sidebar({ links, setSelectedUserId }: SidebarProps) {
  return (
    <div className="relative group flex flex-col h-full gap-4 p-2 border-r">
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({links.length})</span>
        </div>
      </div>

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto overflow-x-hidden">
        {links.map((link, index) => (
          <button
            key={index}
            className={cn(
              buttonVariants({ variant: link.variant, size: 'lg' }),
              link.variant === 'secondary' &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
              'justify-start gap-4',
            )}
            onClick={() => setSelectedUserId(link.id)}
          >
            <Avatar className="flex justify-center items-center">
              <AvatarImage src={link.avatar} alt={link.avatar} width={6} height={6} className="w-10 h-10 " />
              <AvatarFallback className="text-2xl border-solid border-black border-2 rounded-full w-full h-full">
                {link.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-left">{link.name}</span>
              {link.messages.length > 0 && (
                <span className="text-zinc-300 text-xs truncate w-48">
                  {link.messages[link.messages.length - 1].name.split(' ')[0]}:{' '}
                  {link.messages[link.messages.length - 1].message}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
