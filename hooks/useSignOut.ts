"use client";
import { useState } from "react";
import { signOut as _signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";

export function useSignOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const router = useRouter();
  const reducer = useAuthUserStore((state) => state.reducer);

  const signOut = async () => {
    setLoading(true);
    return _signOut(auth)
      .then(() => {
        reducer(null);
      })
      .then(() => {
        router.push("/login");
      })
      .catch((e) => {
        setError(e instanceof Error ? e : Error("unecpected error!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signOut,
    loading,
    error,
  };
}
