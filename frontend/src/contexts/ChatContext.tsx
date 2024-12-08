import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  customerId: string;
  customerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'resolved';
}

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  setCurrentChat: (chat: Chat | null) => void;
  sendMessage: (content: string) => void;
  markAsRead: (chatId: string) => void;
  startNewChat: () => void;
  resolveChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    const savedMessages = localStorage.getItem('messages');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chats to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!currentChat || !user) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substring(2),
      senderId: user.id,
      receiverId: 'seller', // In a real app, this would be the actual seller's ID
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update last message in chat
    setChats(prev => prev.map(chat => 
      chat.id === currentChat.id 
        ? {
            ...chat,
            lastMessage: content,
            lastMessageTime: new Date().toISOString()
          }
        : chat
    ));

    // Simulate seller response after 1 second
    setTimeout(() => {
      const sellerResponse: Message = {
        id: Math.random().toString(36).substring(2),
        senderId: 'seller',
        receiverId: user.id,
        content: "Thank you for your message. Our team will get back to you shortly.",
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, sellerResponse]);
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChat.id 
          ? {
              ...chat,
              lastMessage: sellerResponse.content,
              lastMessageTime: sellerResponse.timestamp,
              unreadCount: chat.unreadCount + 1
            }
          : chat
      ));
    }, 1000);
  };

  const markAsRead = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    ));
  };

  const startNewChat = () => {
    if (!user) return;

    const newChat: Chat = {
      id: Math.random().toString(36).substring(2),
      customerId: user.id,
      customerName: user.name,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      status: 'active'
    };

    setChats(prev => [newChat, ...prev]);
    setCurrentChat(newChat);
  };

  const resolveChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, status: 'resolved' }
        : chat
    ));
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        messages,
        setCurrentChat,
        sendMessage,
        markAsRead,
        startNewChat,
        resolveChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 