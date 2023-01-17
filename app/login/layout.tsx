"use client";
import Header from "@/components/header";
import { PageParam } from "@/types/PageParam";
// import { RecoilRoot } from "recoil";
import { Suspense } from "react";

export default function LoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: PageParam;
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header params={params} />
        {children}
      </Suspense>
    </>
  );
}
