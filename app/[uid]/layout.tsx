"use client";
import { useEffect } from "react";
import Header from "@/components/header";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = useAuthUser();
  const { toProfile, toLogin } = usePage();
  useEffect(() => {
    if (authUser?.uid) {
      if (!authUser?.displayName || !authUser.photoURL) {
        toProfile(authUser?.uid!);
      }
    } else {
      toLogin();
    }
  }, [
    authUser?.displayName,
    authUser?.photoURL,
    authUser?.uid,
    toLogin,
    toProfile,
  ]);
  return (
    <>
      <Header />
      {children}
    </>
  );
}
