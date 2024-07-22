import create from 'zustand';

interface MeState {
  created_date: string;
  description: string;
  login_email: string;
  name: string;
  profile_image_url: string;
  updateMe: (data: Partial<MeState>) => void;
}

export const useMe = create<MeState>((set) => ({
  created_date: '1970-01-01T00:00:00',
  description: 'Hello Valley!',
  login_email: 'user@unknown.com',
  name: 'user',
  profile_image_url: '',
  updateMe: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
