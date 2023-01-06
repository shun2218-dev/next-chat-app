"use client";
import { auth } from "@/firebase";
import { AuthUser } from "@/types/AuthUser";
import { onAuthStateChanged } from "firebase/auth";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const authUserState = atom<AuthUser | null>({
  key: "authUser",
  default: null,
  effects: [
    ({ setSelf }) => {
      let resolvePromise: (value: AuthUser | null) => void;
      const initialValue = new Promise<AuthUser | null>((resolve) => {
        resolvePromise = resolve;
      });
      setSelf(initialValue);

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          const authUser = {
            uid,
            email,
            displayName,
            photoURL,
          };
          resolvePromise(authUser);
          setSelf(authUser);
        } else {
          resolvePromise(null);
          setSelf(null);
        }
      });
      return () => {
        unsubscribe();
      };
    },
  ],
});

export function useAuthUser() {
  return useRecoilValue(authUserState);
}
export function useSetAuthUser() {
  return useSetRecoilState(authUserState);
}
