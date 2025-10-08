import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente da Rota Home (Página isolada)
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const handleLoginClick = () => {
    // Navegação programática para a rota /login
    navigate('/login');
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="p-8 bg-white shadow-lg rounded-xl text-center w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Página Inicial</h2>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 ml-3">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl text-center w-full max-w-md">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">Página Inicial</h2>
      
      {isAuthenticated ? (
        <div>
          <p className="text-gray-700 mb-6">Bem-vindo de volta!</p>
          <p className="text-gray-600">Você está logado no sistema.</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-6">Esta é a página inicial. Faça login para acessar sua conta.</p>
          
          <button
            onClick={handleLoginClick}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
          >
            Ir para Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;