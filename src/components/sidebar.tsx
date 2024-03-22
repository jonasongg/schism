'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Avatar, AvatarImage } from './ui/avatar';
import { Message, UserData } from '@/app/data';
import { AvatarFallback } from '@radix-ui/react-avatar';

interface SidebarProps {
  isCollapsed: boolean;
  links: ({
    messages: Message[];
    variant: 'secondary' | 'ghost';
  } & UserData)[];
  onClick?: () => void;
  isMobile: boolean;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export function Sidebar({ links, isCollapsed, setSelectedUser }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      buttonVariants({ variant: link.variant, size: 'icon' }),
                      'h-11 w-11 md:h-16 md:w-16',
                      link.variant === 'secondary' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage src={link.avatar} alt={link.avatar} width={6} height={6} className="w-10 h-10" />
                      <AvatarFallback className="rounded-full border-2">A</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">{link.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              key={index}
              className={cn(
                buttonVariants({ variant: link.variant, size: 'lg' }),
                link.variant === 'secondary' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                'justify-start gap-4',
              )}
              onClick={() => setSelectedUser(link)}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage src={link.avatar} alt={link.avatar} width={6} height={6} className="w-10 h-10 " />
                <AvatarFallback className="text-2xl border-solid border-black border-2 rounded-full w-full h-full">
                  {link.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].name.split(' ')[0]}:{' '}
                    {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </button>
          ),
        )}
      </nav>
    </div>
  );
}
