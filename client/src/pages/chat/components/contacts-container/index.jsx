import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChat } from '@/hooks/useChat';
import { useLogoutUser } from '@/hooks/useLogoutUser';
import { useAppStore, useChatStore } from '@/store';
import { CirclePlus, LogOutIcon, CircleMinus } from 'lucide-react';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const ContactsContainer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { userInfo } = useAppStore();
  const { getConversations, messages } = useChat();
  const { setSelectedContact } = useChatStore();
  const { logout } = useLogoutUser();
  const navigate = useNavigate();
  const {
    conversations,
    selectedChat,
    setSelectedChat,
    newChat,
    setNewChat,
    setMessages,
  } = useChatStore();

  const handleSelectedMessage = (conversation) => {
    setNewChat(false);
    setSelectedContact(undefined);
    setSelectedChat(undefined);
    setSelectedChat(conversation);
  };

  const handleNewChat = () => {
    setNewChat(!newChat);
    setSelectedContact(undefined);
    setSelectedChat(undefined);
    setMessages([]);
  };

  useEffect(() => {
    getConversations();
  }, [messages]);

  return (
    <>
      {(!isMobile || (isMobile && !newChat && !selectedChat)) && (
        <div className=" md:w-[400px] bg-[#1b1c24] border-r-2 border-[#2f303b] w-screen flex flex-col h-full">
          {/* Header Section */}
          <div>
            <h1 className="text-4xl font-bold p-4 uppercase">
              Messa<span className="text-purple-500">gy</span>
            </h1>
            <div className="flex justify-between items-center text-[#727697] border-b-2 border-[#2f303b] pb-2 mb-3 px-2">
              <h2 className="uppercase font-bold text-lg">Messages</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent border-none hover:bg-transparent hover:text-white transition-all duration-300"
                      onClick={() => handleNewChat()}
                    >
                      {!newChat ? <CirclePlus /> : <CircleMinus />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {!newChat ? <p>New Message</p> : <p>Close</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-2">
            {conversations && conversations?.length > 0 && (
              <>
                {conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-[#2f303b] p-2 rounded-md"
                    onClick={() => handleSelectedMessage(conversation)}
                  >
                    <Avatar className="bg-[#727697]">
                      <img
                        src={conversation?.participants[0]?.profilePicture}
                        alt={`${conversation?.participants[0]?.userName}'s Profile Picture`}
                        className="rounded-full"
                      />
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`${
                          conversation?.messages[0]?.senderId !==
                            userInfo?.id &&
                          conversation?.messages[0]?.readStatus === false
                            ? 'font-bold'
                            : 'text-white/70'
                        } capitalize`}
                      >
                        {conversation?.participants[0]?.firstName}{' '}
                        {conversation?.participants[0]?.lastName}
                      </p>
                      <p
                        className={`${
                          conversation?.messages[0]?.senderId !==
                            userInfo?.id &&
                          conversation?.messages[0]?.readStatus === false
                            ? 'text-white font-bold'
                            : 'text-[#727697]'
                        } text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-full`}
                      >
                        {conversation?.messages[0]?.message}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="px-2">
            <Separator className="mb-2 bg-[#2f303b]" />
            <div className="flex justify-between items-center p-2">
              <div className="flex gap-2 items-center">
                <Avatar
                  className="cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  <img
                    src={userInfo?.profilePicture}
                    alt={`${userInfo?.userName}'s profile picture`}
                    className="rounded-full"
                  />
                </Avatar>
                <div>
                  <p className="capitalize text-[#727697] font-bold">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </p>
                  <p className="text-white/50 text-xs">{userInfo?.email}</p>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent border-none hover:bg-transparent text-[#727697] hover:text-white transition-all duration-300"
                      onClick={() => logout()}
                    >
                      <LogOutIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactsContainer;
