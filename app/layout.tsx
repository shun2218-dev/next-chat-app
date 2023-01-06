"use client";
import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const addHomeClass = () => {
      const bodyClasses = document.body.classList;
      if (!bodyClasses.contains("home")) {
        bodyClasses.remove("pace-done");
        bodyClasses.add("home");
      }
    };
    addHomeClass();
  }, []);
  return (
    <html>
      <head />
      <body>
        <RecoilRoot>
          <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
        </RecoilRoot>
      </body>
    </html>
  );
}
