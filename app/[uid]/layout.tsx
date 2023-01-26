"use client";
import React, { ReactNode } from "react";

// const existUser = async (uid: string) => {
//   const ids = await getUserIds();
//   const exist = ids.includes(uid);
//   return exist;
// };

export default function Authlayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
