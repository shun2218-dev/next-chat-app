"use client";
import Header from "@/components/header";
import { PageParam } from "@/types/PageParam";

export default function RegistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: PageParam;
}) {
  return (
    <>
      <Header params={params} />
      {children}
    </>
  );
}
