"use client";
import React, { ReactNode } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Authlayout({ children }: { children: ReactNode }) {
  const redirect = useAuthRedirect();
  return <>{children}</>;
}
