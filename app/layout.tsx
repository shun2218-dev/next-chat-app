'use client';
import React, { useEffect, Suspense } from 'react';
import '@/styles/fonts/soLovely.css';
import '@/styles/globals.scss';
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
// import { caveat } from "fonts/googleFonts";
import { usePage } from '@/hooks/usePage';
import { useAuthUserStore } from '@/atoms/useAuthUserStore';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorIcon from '@/icons/errorIcon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        suspense: true,
      },
    },
  });
  const pathname = usePathname();
  const { toLogin, toUser } = usePage();
  const authUser = useAuthUserStore((state) => state.authUser);
  useEffect(() => {
    const addHomeClass = () => {
      const bodyClasses = document.body.classList;
      if (!bodyClasses.contains('home')) {
        bodyClasses.add('home');
      }
    };
    if (pathname === '/' || pathname === '/start') {
      addHomeClass();
    } else {
      document.body.classList.remove('home');
      if (
        pathname === '/login' ||
        pathname === '/regist' ||
        pathname === '/reset'
      ) {
        if (authUser !== null) {
          toUser(authUser.uid);
        }
      } else {
        if (authUser === null) {
          toLogin();
        }
      }
    }
  }, [authUser, pathname, toLogin, toUser]);
  return (
    // <html lang="en" className={[caveat.variable].join(" ")}>
    <html lang="en">
      <head />
      <body>
        <Suspense fallback={<div>page loading...</div>}>
          <Header />
          <Suspense fallback={<div>contents loading...</div>}>
            <ErrorBoundary fallback={<ErrorIcon />}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </ErrorBoundary>
          </Suspense>
        </Suspense>
      </body>
    </html>
  );
}
