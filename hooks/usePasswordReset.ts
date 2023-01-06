"use client";
import { useState } from "react";
import { auth } from "@/firebase";
import { usePage } from "./usePage";
import { sendPasswordResetEmail } from "firebase/auth";

export function usePasswordReset() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { toComplete, toRedirect } = usePage();
  const actionCodeSettings = {
    // パスワード再設定後のリダイレクト URL
    url: "http://127.0.0.1:5173/login",
    handleCodeInApp: false,
  };

  // eslint-disable-next-line max-len
  const passwordReset = async (email: string) => {
    setLoading(true);
    return await sendPasswordResetEmail(auth, email)
      .then(() => {
        toComplete({
          title: "Success",
          status: "success",
          text: "Send Email succeeded",
          email,
        });
      })
      .catch((e) => {
        setError(e instanceof Error ? e : Error("unecpected error!"));
        toRedirect({
          title: "Error",
          status: "error",
          text: "Send Email failed.",
          strong: error?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    passwordReset,
    loading,
    error,
  };
}
