"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { usePage } from "./usePage";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";

export function useSignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { toProfile } = usePage();
  const reducer = useAuthUserStore((state) => state.reducer);

  const addUserList = async (
    uid: string,
    data: Pick<User, "uid" | "email" | "displayName" | "photoURL">
  ) => {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { ...data });
  };

  // eslint-disable-next-line max-len
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const {
          user: { uid, email, displayName, photoURL },
        } = res;
        const authUser = { uid, email, displayName, photoURL };
        await addUserList(uid, authUser);
        reducer(authUser);
        return uid;
      })
      .then((uid) => toProfile(uid))
      .catch((e) => {
        setError(e instanceof Error ? e : Error("unecpected error!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signUp,
    loading,
    error,
  };
}
