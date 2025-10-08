import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import authService from '../services/authService';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há token salvo ao inicializar
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true); // Garantir que inicia como loading
      const savedToken = authService.getToken();
      if (savedToken) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          // Token inválido, remover
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email_address: email, password });
      
      if (response.token) {
        setToken(response.token);
        
        // Se a resposta não incluir o user, buscar separadamente
        if (response.user) {
          setUser(response.user);
        } else {
          try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
          } catch (userError) {
            // Se não conseguir buscar o usuário, fazer logout
            authService.logout();
            setToken(null);
            throw new Error('Erro ao obter dados do usuário');
          }
        }
      } else {
        throw new Error('Token não recebido');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
  }), [user, token, isLoading, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};