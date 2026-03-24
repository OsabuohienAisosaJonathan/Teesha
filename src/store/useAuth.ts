import { create } from 'zustand';
import axios from '@/lib/axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'tutor' | 'student';
  avatar_url: string | null;
  bio: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    const { user, authorisation } = response.data;
    localStorage.setItem('token', authorisation.token);
    set({ user, token: authorisation.token, isAuthenticated: true });
  },

  register: async (data) => {
    const response = await axios.post('/auth/register', data);
    const { user, authorisation } = response.data;
    localStorage.setItem('token', authorisation.token);
    set({ user, token: authorisation.token, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await axios.post('/auth/logout');
    } catch (e) {}
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const response = await axios.get('/auth/me');
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
