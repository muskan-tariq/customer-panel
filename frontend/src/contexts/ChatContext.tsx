import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import geminiService from '../services/geminiService';

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
  sendMessage: (content: string) => Promise<void>;
  markAsRead: (chatId: string) => void;
  startNewChat: () => void;
  resolveChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load initial chats from localStorage
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

  // Save chats and messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [chats, messages]);

  const sendMessage = async (content: string) => {
    if (!currentChat || !user) return;

    setLoading(true);
    try {
      // Add user message
      const userMessage: Message = {
        id: Math.random().toString(36).substring(2),
        senderId: user.id,
        receiverId: 'ai-assistant',
        content,
        timestamp: new Date().toISOString(),
        isRead: true
      };

      setMessages(prev => [...prev, userMessage]);
      
      // Get AI response
      const aiResponse = await geminiService.sendMessage(content);
      
      // Add AI message
      const aiMessage: Message = {
        id: Math.random().toString(36).substring(2),
        senderId: 'ai-assistant',
        receiverId: user.id,
        content: aiResponse,
        timestamp: new Date().toISOString(),
        isRead: false
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update chat with last message
      setChats(prev => prev.map(chat => 
        chat.id === currentChat.id
          ? {
              ...chat,
              lastMessage: aiResponse,
              lastMessageTime: new Date().toISOString(),
              unreadCount: chat.unreadCount + 1
            }
          : chat
      ));
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: Math.random().toString(36).substring(2),
        senderId: 'ai-assistant',
        receiverId: user.id,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
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

    // Clear Gemini chat history when starting a new chat
    geminiService.clearHistory();

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

  const deleteChat = (chatId: string) => {
    // Remove the chat
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If the deleted chat was the current chat, set currentChat to null
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
    }
    
    // Remove all messages associated with this chat
    setMessages(prev => prev.filter(message => 
      !(message.senderId === currentChat?.customerId || message.receiverId === currentChat?.customerId)
    ));

    // Clear Gemini chat history if deleting current chat
    if (currentChat?.id === chatId) {
      geminiService.clearHistory();
    }
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
        resolveChat,
        deleteChat
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