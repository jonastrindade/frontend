import api from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
  ApiError
} from '../types/auth';

class AuthService {
  // Login do usuário
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth', credentials);
      
      // Se o login for bem-sucedido, salvar o token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Registro de novo usuário
  async register(userData: RegisterRequest): Promise<void> {
    try {
      await api.post('/users', userData);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Esqueceu a senha
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    try {
      await api.post('/passwords/forgot', data);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Reset de senha
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      await api.post('/passwords/reset', data);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Obter informações do usuário atual
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/users/me');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obter token do localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Tratamento de erros
  private handleError(error: any): ApiError {
    if (error.response?.data) {
      return error.response.data;
    }
    
    return {
      message: error.message || 'Erro desconhecido',
    };
  }
}

export default new AuthService();