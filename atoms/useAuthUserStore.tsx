"use client";
// import { auth } from "@/firebase";
// import { AuthUser } from "@/types/AuthUser";
// import { onAuthStateChanged } from "firebase/auth";
// import { atom, useRecoilValue, useSetRecoilState } from "recoil";

// const authUserState = atom<AuthUser | null>({
//   key: "authUser",
//   default: null,
//   effects: [
//     ({ setSelf }) => {
//       let resolvePromise: (value: AuthUser | null) => void;
//       const initialValue = new Promise<AuthUser | null>((resolve) => {
//         resolvePromise = resolve;
//       });
//       setSelf(initialValue);

//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const { uid, email, displayName, photoURL } = user;
//           const authUser = {
//             uid,
//             email,
//             displayName,
//             photoURL,
//           };
//           resolvePromise(authUser);
//           setSelf(authUser);
//         } else {
//           resolvePromise(null);
//           setSelf(null);
//         }
//       });
//       return () => {
//         unsubscribe();
//       };
//     },
//   ],
// });

// export function useAuthUser() {
//   return useRecoilValue(authUserState);
// }
// export function useSetAuthUser() {
//   return useSetRecoilState(authUserState);
// }
import { User } from "firebase/auth";
import { create } from "zustand";
import { subscribeWithSelector, devtools } from "zustand/middleware";

type AuthUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

type Reducer = (
  authUser: Pick<User, "uid" | "email" | "displayName" | "photoURL"> | null
) => void;

export type AuthUserState = {
  authUser: AuthUser | null;
  isLogin: () => boolean;
  //   login: (authUser: Pick<User, "uid" | "email" | "displayName">) => void;
  //   logout: () => void;
  reducer: Reducer;
};

export const useAuthUserStore = create(
  devtools(
    subscribeWithSelector<AuthUserState>((set, get) => ({
      authUser: null,
      isLogin: () => !!get().authUser,
      //   login: (authUser) => set({ authUser }),
      //   logout: () => set({ authUser: null }),
      reducer: (authUser) => set({ authUser }),
    }))
  )
);
