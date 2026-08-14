import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  age?: number;
  bloodType?: string;
  avatarUrl?: string;
  emergencyContactCount?: number;
  pairedDeviceId?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  demoLogin: (role?: 'Elderly' | 'Caregiver') => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'elderguard_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo user so users can explore immediately or log in
    return {
      id: 'usr-88210',
      name: 'Eleanor Vance',
      email: 'eleanor.vance@demo.elderguard.io',
      role: 'Elderly User',
      phone: '+1 (555) 234-5678',
      age: 74,
      bloodType: 'O+',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      emergencyContactCount: 3,
      pairedDeviceId: 'EG-BAND-77402'
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await loginUser(email, pass);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (role: 'Elderly' | 'Caregiver' = 'Elderly') => {
    setIsLoading(true);
    try {
      if (role === 'Caregiver') {
        const res = await loginUser('caregiver.sarah@demo.elderguard.io', 'demo1234');
        setUser(res.user);
      } else {
        const res = await loginUser('eleanor.vance@demo.elderguard.io', 'demo1234');
        setUser(res.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await registerUser(userData);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        demoLogin,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
