'use client';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import {
  subscribeWithSelector,
  devtools,
  persist,
  createJSONStorage,
} from 'zustand/middleware';

type AuthUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

type Reducer = (
  authUser: Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'> | null
) => void;

export type AuthUserState = {
  authUser: AuthUser | null;
  isLogin: () => boolean;
  reducer: Reducer;
};

export const useAuthUserStore = create(
  devtools(
    persist(
      subscribeWithSelector<AuthUserState>((set, get) => ({
        authUser: null,
        isLogin: () => !!get().authUser,
        reducer: (authUser) => set({ authUser }),
      })),
      {
        name: 'authUser',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
