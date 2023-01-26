"use client";
import React from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function UserPage() {
  // const { uid } = params;
  // const existUser = useCallback(
  //   async (uid: string) => {
  //     const ids = await getUserIds();
  //     const exist = ids.includes(uid);
  //     return exist;
  //   },
  //   [uid]
  // );

  useAuthRedirect();

  return <div>Now Log In...</div>;
}
