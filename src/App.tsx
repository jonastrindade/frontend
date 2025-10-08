import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout, isLoading } = useAuth();
  
  // Não renderizar nada enquanto está carregando
  if (isLoading) {
    return (
      <header className="w-full bg-white shadow-md p-4 flex justify-center">
        <nav className="space-x-8 flex items-center">
          <a href="/" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">
            Home
          </a>
          <div className="text-lg font-medium text-gray-500">Carregando...</div>
        </nav>
      </header>
    );
  }
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-center">
      <nav className="space-x-8 flex items-center">
        <a href="/" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">
          Home
        </a>
        
        {!isAuthenticated ? (
          <>
            <a href="/login" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">
              Login
            </a>
            <a href="/register" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">
              Registro
            </a>
          </>
        ) : (
          <>
            <button 
              onClick={logout}
              className="text-lg font-medium text-gray-700 hover:text-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      {/* Main expande até empurrar o footer */}
      <main className="flex-grow w-full p-4 flex items-start justify-center">
        <Outlet />
      </main>

      {/* Footer só aparece no final da página */}
      <footer className="w-full bg-gray-100 text-center p-3 text-gray-500 text-sm">
        Rodapé no fim do conteúdo
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
