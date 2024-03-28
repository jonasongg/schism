import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserData } from '@/app/data';

interface ChatTopbarProps {
  selectedUser: UserData;
}

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} width={6} height={6} className="w-10 h-10 " />
          <AvatarFallback className="text-2xl border-solid border-black border-2 rounded-full w-full h-full">
            {selectedUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">Online</span>
        </div>
      </div>
    </div>
  );
}
