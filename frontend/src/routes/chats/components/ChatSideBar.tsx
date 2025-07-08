import { EllipsisVertical } from "lucide-react";
import ChatSearchBar from "./ChatSearchBar";
import UserChatLists from "./UserChatLists";

export default function ChatSideBar() {
  return (
    <aside className="h-screen bg-gray-100 py-2 pl-3 flex flex-col">
      <div>
        <div className="px-3 py-2 flex justify-between items-center">
          <h2 className="text-2xl font-bold">ChatWave</h2>
          <div className="">
            <EllipsisVertical size={20} className="cursor-pointer " />
          </div>
        </div>
        {/* search bar */}
        <ChatSearchBar />
      </div>
      <UserChatLists />
    </aside>
  );
}
