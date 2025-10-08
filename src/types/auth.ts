// Tipos para requisições de autenticação
export interface LoginRequest {
  email_address: string;
  password: string;
}

export interface RegisterRequest {
  user: {
    email_address: string;
    password: string;
    password_confirmation: string;
  };
}

export interface ForgotPasswordRequest {
  email_address: string;
}

export interface ResetPasswordRequest {
  user: {
    token: string;
    password: string;
    password_confirmation: string;
  };
}

// Tipos para respostas da API
export interface LoginResponse {
  token?: string;
  user?: User;
  message?: string;
}

export interface User {
  id: number;
  email_address: string;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}