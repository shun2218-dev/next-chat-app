"use client";
import { useState } from "react";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { usePage } from "./usePage";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";

export function useSignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { toHome, toRedirect } = usePage();
  const reducer = useAuthUserStore((state) => state.reducer);

  // eslint-disable-next-line max-len
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    return await setPersistence(auth, browserSessionPersistence).then(
      async () => {
        return await signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            // if (res.user.uid) {
            //   toHome(res.user.uid, {
            //     title: "Success",
            //     status: "success",
            //     text: "Login succeeded.",
            //   });
            // }
            const { user } = res;
            const authUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            };
            reducer(authUser);
            console.log("login successful");
          })
          .catch((e) => {
            setError(e instanceof Error ? e : Error("unecpected error!"));
            toRedirect({
              title: "Error",
              status: "error",
              text: "Login failed.",
              strong: error?.message,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  };

  return {
    signIn,
    loading,
    error,
  };
}
