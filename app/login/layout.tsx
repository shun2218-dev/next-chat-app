"use client";
import Header from "@/components/header";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {children}
      </Suspense>
    </RecoilRoot>
  );
}
