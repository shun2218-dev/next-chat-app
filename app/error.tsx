'use client'; // Error components must be Client components

import { AuthUserState, useAuthUserStore } from '@/atoms/useAuthUserStore';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';

export default function Error({ error }: { error: Error }) {
  const state = useAuthUserStore((state) => state);
  const path = useMemo(
    () => (state.isLogin() ? `/${state.authUser!.uid}/home` : '/'),
    [state]
  );
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something Error!</h2>
      <button>
        <Link href={path}>Back to Top</Link>
      </button>
    </div>
  );
}
