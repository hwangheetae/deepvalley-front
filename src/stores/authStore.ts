import { create } from 'zustand';
interface AuthState {
  isLoggedOut: boolean;
  setIsLoggedOut: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedOut: false,
  setIsLoggedOut: (value) =>
    set({
      isLoggedOut: value,
    }),
}));
