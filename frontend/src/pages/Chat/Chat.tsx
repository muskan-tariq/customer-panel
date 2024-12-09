import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Container, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Send as SendIcon, Chat as ChatIcon, MoreVert as MoreVertIcon, Close as CloseIcon, AttachFile as AttachFileIcon, EmojiEmotions as EmojiIcon, Delete as DeleteIcon, Archive as ArchiveIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const Chat = () => {
  const { user } = useAuth();
  const { chats, currentChat, messages, setCurrentChat, sendMessage, startNewChat, deleteChat } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native);
    setShowEmoji(false);
  };

  const handleNewChat = () => {
    if (selectedProduct) {
      startNewChat();
      setShowNewChatDialog(false);
      setSelectedProduct('');
    }
  };

  const handleDeleteChat = () => {
    if (currentChat) {
      deleteChat(currentChat.id);
      setAnchorEl(null);
    }
  };

  const handleSwitchChat = (chat: any) => {
    setCurrentChat(chat);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
      <Paper sx={{ height: 'calc(100vh - 100px)', display: 'flex', overflow: 'hidden', boxShadow: 3 }}>
        {/* Chat List */}
        <Box sx={{ width: 280, borderRight: 1, borderColor: 'divider' }}>
          <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Messages</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<ChatIcon sx={{ fontSize: 16 }} />}
              onClick={() => setShowNewChatDialog(true)}
              sx={{ 
                textTransform: 'none', 
                bgcolor: '#FF66C4',
                '&:hover': { bgcolor: '#ff4db7' },
                fontSize: '0.8rem'
              }}
            >
              New Chat
            </Button>
          </Box>
          
          <List sx={{ overflow: 'auto', height: 'calc(100% - 52px)' }}>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                sx={{ 
                  cursor: 'pointer',
                  bgcolor: currentChat?.id === chat.id ? 'rgba(255, 102, 196, 0.1)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255, 102, 196, 0.05)' },
                  py: 1
                }}
                onClick={() => handleSwitchChat(chat)}
              >
                <ListItemAvatar>
                  <Badge
                    color="error"
                    badgeContent={chat.unreadCount}
                    invisible={chat.unreadCount === 0}
                  >
                    <Avatar sx={{ 
                      width: 36, 
                      height: 36,
                      bgcolor: chat.status === 'active' ? '#FF66C4' : 'grey.400',
                      fontSize: '0.9rem'
                    }}>
                      {chat.customerName[0]}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {chat.customerName}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 150,
                        display: 'block'
                      }}
                    >
                      {chat.lastMessage || 'Start a conversation'}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Window */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {currentChat ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ 
                    width: 36, 
                    height: 36,
                    bgcolor: currentChat.status === 'active' ? '#FF66C4' : 'grey.400',
                    fontSize: '0.9rem'
                  }}>
                    {currentChat.customerName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{currentChat.customerName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currentChat.status === 'active' ? 'Active now' : 'Offline'}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Options Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleDeleteChat}>
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">Delete Chat</Typography>
                </MenuItem>
              </Menu>

              {/* Messages */}
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, bgcolor: '#fafafa' }}>
                {messages
                  .filter(msg => 
                    msg.senderId === currentChat.customerId || 
                    msg.receiverId === currentChat.customerId
                  )
                  .map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.senderId === user?.id ? 'flex-end' : 'flex-start',
                        mb: 1
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          bgcolor: message.senderId === user?.id ? '#FF66C4' : 'white',
                          color: message.senderId === user?.id ? 'white' : 'text.primary',
                          borderRadius: 2,
                          p: 1,
                          boxShadow: 1,
                          fontSize: '0.9rem'
                        }}
                      >
                        <Typography variant="body2">{message.content}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontSize: '0.7rem' }}>
                          {format(new Date(message.timestamp), 'p')}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
              </Box>

              {/* Message Input */}
              <Box
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                  p: 1.5,
                  borderTop: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center'
                }}
              >
                <Tooltip title="Attach file">
                  <IconButton size="small">
                    <AttachFileIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Box sx={{ position: 'relative' }}>
                  <Tooltip title="Emoji">
                    <IconButton size="small" onClick={() => setShowEmoji(!showEmoji)}>
                      <EmojiIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {showEmoji && (
                    <Box sx={{ position: 'absolute', bottom: '100%', left: 0, zIndex: 1 }}>
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </Box>
                  )}
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.9rem'
                    }
                  }}
                />
                <IconButton 
                  color="primary"
                  type="submit"
                  disabled={!newMessage.trim()}
                  size="small"
                  sx={{ color: '#FF66C4' }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                p: 3,
                textAlign: 'center'
              }}
            >
              <ChatIcon sx={{ fontSize: 48, color: '#FF66C4', opacity: 0.7 }} />
              <Typography variant="h6" sx={{ fontSize: '1rem', color: 'text.secondary' }}>
                Select a chat or start a new conversation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, fontSize: '0.85rem' }}>
                Connect with our customer support team for any questions about our products.
              </Typography>
              <Button
                variant="contained"
                startIcon={<ChatIcon />}
                onClick={() => setShowNewChatDialog(true)}
                sx={{ 
                  mt: 1,
                  bgcolor: '#FF66C4',
                  '&:hover': { bgcolor: '#ff4db7' },
                  fontSize: '0.9rem'
                }}
              >
                Start New Chat
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      {/* New Chat Dialog */}
      <Dialog open={showNewChatDialog} onClose={() => setShowNewChatDialog(false)}>
        <DialogTitle sx={{ fontSize: '1rem' }}>Start New Chat</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="product-select-label" sx={{ fontSize: '0.9rem' }}>Select Product</InputLabel>
            <Select
              labelId="product-select-label"
              value={selectedProduct}
              onChange={(e: SelectChangeEvent<string>) => setSelectedProduct(e.target.value)}
              label="Select Product"
              size="small"
              sx={{ fontSize: '0.9rem' }}
            >
              <MenuItem value="moisturizer">Moisturizer</MenuItem>
              <MenuItem value="serum">Serum</MenuItem>
              <MenuItem value="toner">Toner</MenuItem>
              <MenuItem value="facewash">Face Wash</MenuItem>
              <MenuItem value="sunscreen">Sunscreen</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowNewChatDialog(false)}
            sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleNewChat}
            variant="contained"
            disabled={!selectedProduct}
            sx={{ 
              bgcolor: '#FF66C4',
              '&:hover': { bgcolor: '#ff4db7' },
              fontSize: '0.9rem'
            }}
          >
            Start Chat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Chat; 