import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Importa as ferramentas essenciais para a configuração do roteador
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import ResetPassword from './pages/ResetPassword.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

// 1. Defina o objeto de roteador (Estrutura de Rotas)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O componente App funciona como o layout principal (pai)
    children: [
      {
        index: true, // Rota padrão para o caminho "/"
        element: <Home />, // Renderiza o componente Home no Outlet do App
      },
      {
        path: "login", // O caminho final será "/login"
        element: (
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "register", // O caminho final será "/register"
        element: (
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgot-password", // O caminho final será "/forgot-password"
        element: (
          <ProtectedRoute requireAuth={false}>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "reset-password", // O caminho final será "/reset-password"
        element: (
          <ProtectedRoute requireAuth={false}>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Envolve a aplicação com o provedor de roteamento */}
    <RouterProvider router={router} />
  </StrictMode>,
)
