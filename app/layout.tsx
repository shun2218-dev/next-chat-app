"use client";
import React, { useEffect, Suspense } from "react";
import "@/styles/globals.scss";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/header";

// const Header = dynamic(() => import("@/components/header"));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    const addHomeClass = () => {
      const bodyClasses = document.body.classList;
      if (!bodyClasses.contains("home")) {
        bodyClasses.add("home");
      }
    };
    if (pathname === "/" || pathname === "/start") {
      addHomeClass();
    } else {
      document.body.classList.remove("home");
    }
  }, [pathname]);
  return (
    <html>
      <head />
      <body>
        <Suspense fallback={<div>page loading...</div>}>
          <Header />
          <Suspense fallback={<div>contents loading...</div>}>
            {children}
          </Suspense>
        </Suspense>
      </body>
    </html>
  );
}
