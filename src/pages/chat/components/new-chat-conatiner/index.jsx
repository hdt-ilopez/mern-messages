import ChatComponent from '@/components/ChatComponent';
import ChatInput from '@/components/ChatInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useGetUserContacts } from '@/hooks/useGetUserContacts';
import { useChatStore } from '@/store';
import { selectedChat } from '@/store/slices/chat-slice';
import { Avatar } from '@radix-ui/react-avatar';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const NewChatContainer = () => {
  const {
    setNewChat,
    contacts,
    selectedContact,
    setSelectedContact,
    conversations,
    setSelectedChat,
    setMessages,
  } = useChatStore();
  const { loading, getUserContacts } = useGetUserContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [userSuggestions, setUserSuggestions] = useState();

  const handleSetSelectedContact = (contact) => {
    if (contact._id) {
      const matchedConversation = conversations.find((conversation) =>
        conversation.participants.some(
          (participant) => participant._id === contact._id
        )
      );

      if (matchedConversation) {
        setNewChat(false);
        setSelectedChat(matchedConversation);
      } else {
        setSelectedContact(contact);
      }
    }
  };

  useEffect(() => {
    getUserContacts();
  }, []);

  const handleSetSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length === 0) {
        setUserSuggestions([]);
        return;
      }

      try {
        const suggestions = await axios.post('/api/chat/user-suggestions', {
          searchQuery,
          withCredentials: true,
        });

        setUserSuggestions(suggestions.data);
      } catch (error) {
        console.error('Error fetching suggerstions:', error);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleCloseNewChat = () => {
    setNewChat(false);
    setSelectedContact(undefined);
    setSelectedChat(undefined);
    setMessages([]);
  };

  if (loading) {
    return (
      <div className="bg-[#1c1d25] h-screen w-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg  bg-[#2f303b]"></span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1c1d25] transition-all duration-1000 p-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent border-none hover:bg-transparent hover:text-white/70 transition-all duration-300"
          onClick={() => handleCloseNewChat()}
        >
          <ArrowLeft size={30} />
        </Button>
        <div className=" font-bold text-3xl text-[#727697]">
          {selectedContact ? (
            <div className="flex gap-2 items-center">
              <Avatar>
                <img
                  src={selectedContact?.profilePicture}
                  alt={`${selectedContact?.firstName}'s profile picture`}
                  width={50}
                />
              </Avatar>
              <p className="text-white capitalize">
                {selectedContact?.firstName} {selectedContact?.lastName}
              </p>
            </div>
          ) : (
            <h2 className="uppercase">New Chat</h2>
          )}
        </div>
      </div>

      {!selectedContact && (
        <div className="relative flex gap-2 items-center pl-2 mb-4">
          <p className="text-lg">To: </p>
          <Input
            placeholder="Type a username to start a chat"
            className="border-none focus-visible:ring-transparent"
            value={searchQuery}
            onChange={(e) => handleSetSearchQuery(e)}
          />
        </div>
      )}
      <Separator className="m-0 bg-[#2f303b]" />

      <div className="flex-1 overflow-y-auto">
        {!selectedContact || selectedContact?.length === 0 ? (
          <div className="flex flex-col mt-4">
            {(!contacts || contacts.length === 0) &&
            (!userSuggestions || userSuggestions.length === 0) ? (
              <div className="h-screen flex justify-center items-center flex-col gap-4">
                <img
                  src="/images/notFound.png"
                  alt="not found image"
                  width={400}
                />
                <h2 className="text-xl text-[#727697] capitalize font-bold">
                  You do not have any contacts, add a user to begin chatting
                </h2>
              </div>
            ) : (
              <>
                {!searchQuery ? (
                  <div className="flex flex-col gap-2">
                    {contacts?.map(({ contactId }) => (
                      <div
                        key={contactId._id}
                        className="flex items-center gap-2 p-2  rounded-md cursor-pointer hover:bg-[#3a3b45] transition-all"
                        onClick={() => handleSetSelectedContact(contactId)}
                      >
                        <img
                          src={contactId?.profilePicture}
                          alt={`${contactId?.firstName}'s profile picture`}
                          width={50}
                        />
                        <div>
                          <p className="text-lg font-semibold">
                            {contactId.firstName} {contactId.lastName}
                          </p>
                          <p className="text-sm capitalize text-[#727697]">
                            @{contactId.userName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {userSuggestions?.map((user, index) => (
                      <div
                        className="flex gap-2 hover:bg-[#727697] p-2 rounded-sm duration-300 transition-all cursor-pointer"
                        key={index}
                        onClick={() => handleSetSelectedContact(user)}
                      >
                        <Avatar>
                          <img
                            src={user?.profilePicture}
                            alt={`${user?.firstName}'s profile picture`}
                            width={50}
                          />
                        </Avatar>
                        <div>
                          <p className="text-lg font-bold">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-white/60">
                            @{user?.userName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="relative h-full">
            <div className="absolute bottom-0 w-full">
              <ChatComponent />
              <ChatInput contact={selectedContact} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewChatContainer;
