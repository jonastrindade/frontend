import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean; // true = precisa estar logado, false = precisa estar deslogado
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/', 
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Aguardar verificação de autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  // Se requer autenticação mas não está logado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se não requer autenticação (páginas de login/registro) mas está logado
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;