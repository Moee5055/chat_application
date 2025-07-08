import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareText, Settings } from "lucide-react";

export default function LeftSideBar() {
  return (
    <div className="bg-gray-200 px-3 py-2 flex flex-col items-center">
      <div className="flex-1 pt-3">
        <MessageSquareText className="fill-gray-100 " size={30} />
      </div>
      <div className="pb-3 flex flex-col items-center gap-4">
        <Settings size={30} />
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" sizes="40" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
