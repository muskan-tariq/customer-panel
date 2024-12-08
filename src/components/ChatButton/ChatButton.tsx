import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab, Badge } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import { useChat } from '../../contexts/ChatContext';

const ChatButton: React.FC = () => {
  const navigate = useNavigate();
  const { chats } = useChat();

  const unreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <Fab
      aria-label="chat"
      onClick={() => navigate('/chat')}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'white',
        color: '#FF66C4',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        '&:hover': {
          backgroundColor: '#fff5f9',
        },
        border: '2px solid #FF66C4',
      }}
    >
      <Badge 
        badgeContent={unreadCount} 
        color="error" 
        max={99}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#FF66C4',
            color: 'white',
          }
        }}
      >
        <ChatIcon />
      </Badge>
    </Fab>
  );
};

export default ChatButton;
