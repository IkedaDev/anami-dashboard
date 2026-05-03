import { ApiResponse } from './api-response.model';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Tipo específico para la respuesta de login
export type AuthResponse = ApiResponse<LoginResponse>;
