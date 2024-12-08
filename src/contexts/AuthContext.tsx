import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  addresses: {
    id: string;
    type: 'billing' | 'shipping';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addAddress: (address: Omit<User['addresses'][0], 'id'>) => Promise<void>;
  updateAddress: (addressId: string, data: Partial<Omit<User['addresses'][0], 'id'>>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For now, we'll simulate a successful login
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      addresses: []
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, name: string) => {
    // In a real app, this would make an API call
    // For now, we'll simulate a successful registration
    const mockUser: User = {
      id: '1',
      email,
      name,
      addresses: []
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...data
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const addAddress = async (address: Omit<User['addresses'][0], 'id'>) => {
    if (!user) return;

    const newAddress = {
      ...address,
      id: Math.random().toString(36).substr(2, 9)
    };

    const updatedUser = {
      ...user,
      addresses: [...user.addresses, newAddress]
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateAddress = async (addressId: string, data: Partial<Omit<User['addresses'][0], 'id'>>) => {
    if (!user) return;

    const updatedAddresses = user.addresses.map(addr => 
      addr.id === addressId ? { ...addr, ...data } : addr
    );

    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) return;

    const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);

    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading,
        login, 
        register, 
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}