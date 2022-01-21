import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  error: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  // signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      setLoading(true);
      setError(false);
      const response = await api.post<AuthState>('/sessions', {
        email,
        password
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setData(response.data);
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      user: data.user, 
      loading,
      error,
      signIn 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };