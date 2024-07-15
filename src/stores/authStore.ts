import { create } from 'zustand';

type User = {
  email: string;
  name: string;
};

type AuthStore = {
  user: null | User;
  login: (userData: User) => void;
  logout: () => void;
  getCurrentUser: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  getCurrentUser: () => JSON.parse(localStorage.getItem('user')!),
}));

export default useAuthStore;
