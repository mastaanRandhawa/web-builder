import { create } from 'zustand';
import { User, UserRole } from '../types';
import { authApi } from '../api/mockApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  isAuthenticated: () => boolean;
  hasRole: (role: UserRole) => boolean;
}

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('auth-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return { user: parsed.user || null, token: parsed.token || null };
    }
  } catch {
    // Ignore parse errors
  }
  return { user: null, token: null };
};

const saveToStorage = (user: User | null, token: string | null) => {
  try {
    localStorage.setItem('auth-storage', JSON.stringify({ user, token }));
  } catch {
    // Ignore storage errors
  }
};

export const useAuthStore = create<AuthState>()((set, get) => {
  const initial = loadFromStorage();
  
  return {
    user: initial.user,
    token: initial.token,
    isLoading: false,

    login: async (email: string, password: string) => {
      set({ isLoading: true });
      try {
        const response = await authApi.login(email, password);
        set({ user: response.user, token: response.token, isLoading: false });
        saveToStorage(response.user, response.token);
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    signup: async (name: string, email: string, password: string) => {
      set({ isLoading: true });
      try {
        const response = await authApi.signup(name, email, password);
        set({ user: response.user, token: response.token, isLoading: false });
        saveToStorage(response.user, response.token);
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    logout: () => {
      set({ user: null, token: null });
      localStorage.removeItem('auth-storage');
    },

    checkAuth: async () => {
      const { token } = get();
      if (!token) {
        set({ user: null });
        return;
      }

      try {
        const user = await authApi.getMe(token);
        set({ user });
        saveToStorage(user, token);
      } catch (error) {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage');
      }
    },

    isAuthenticated: () => {
      return get().user !== null && get().token !== null;
    },

    hasRole: (role: UserRole) => {
      return get().user?.role === role;
    },
  };
});
