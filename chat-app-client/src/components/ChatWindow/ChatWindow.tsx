import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { useAuth } from '../../context/AuthContext';
import { getChatDetails } from '../../api/chat';
import { MessageList } from '../MessageList/MessageList';
import { MessageInput } from '../MessageInput/MessageInput';
import { AddMemberSearch } from '../AddMemberSearch/AddMemberSearch';
import { GroupInfo } from '../ChatLayout/GroupInfo/GroupInfo';
import { ChatWindowHeader } from './ChatWindowHeader';
import { useChatMessages } from './useChatMessages';
import { useMemberMap } from './useMemberMap';
import { getChatLabel } from '../../utils/chatLabel';
import type { Chat } from '../../types';
import './ChatWindow.css';

type ChatWindowProps = {
  chat: Chat | null;
};

export function ChatWindow({ chat }: ChatWindowProps) {
  const { userId: myUserId } = useAuth();
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [chatDetails, setChatDetails] = useState<Chat | null>(null);
  const selectedChatId = chat?.id ?? null;

  const { messages, sendMessage } = useChatMessages(selectedChatId);
  const memberMap = useMemberMap(selectedChatId);

  const handleOpenInfo = async () => {
    if (!selectedChatId) return;
    const data = await getChatDetails(selectedChatId);
    setChatDetails(data);
    setInfoOpen(true);
  };

  if (!chat) {
    return (
      <div className="chat-window-empty">
        <ForumIcon className="chat-window-empty-icon" />
        <p className="chat-window-empty-text">Select a chat to start messaging</p>
      </div>
    );
  }

  const label = getChatLabel(chat, myUserId);

  return (
    <div className="chat-window">
      <ChatWindowHeader
        label={label}
        isGroup={chat.isGroup}
        onOpenInfo={handleOpenInfo}
        onOpenAddMember={() => setAddMemberOpen(true)}
      />

      <MessageList messages={messages} mySenderId={myUserId} memberMap={memberMap} />
      <MessageInput onSend={sendMessage} />

      <Dialog open={addMemberOpen} onClose={() => setAddMemberOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle className="chat-window-dialog-title">
          Add member to {label}
        </DialogTitle>
        <DialogContent className="chat-window-dialog-content">
          <AddMemberSearch
            chatId={chat.id}
            onMemberAdded={() => setAddMemberOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle className="chat-window-dialog-title">
          Group Info
        </DialogTitle>
        <DialogContent className="chat-window-dialog-content">
          {chatDetails && (
            <GroupInfo
              name={chatDetails.name}
              code={chatDetails.code}
              members={chatDetails.members}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
