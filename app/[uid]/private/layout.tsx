"use client";
import { Suspense } from "react";
import { PageParam } from "@/types/PageParam";
import UserList from "@/components/userList";

export default function PrivateLayout({
  params,
  children,
}: {
  params: PageParam;
  children: React.ReactNode;
}) {
  return (
    <>
      <UserList params={params} />
      {children}
    </>
  );
}
