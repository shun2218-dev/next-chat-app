"use client"; // Error components must be Client components

import { AuthUserState, useAuthUserStore } from "@/atoms/useAuthUserStore";
import { usePage } from "@/hooks/usePage";
import { useCallback, useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const { toStart, toHome } = usePage();
  const state = useAuthUserStore((state) => state);
  const onClick = useCallback((state: AuthUserState) => {
    const { authUser } = state;
    if (authUser === null) {
      toStart();
    } else {
      toHome(authUser.uid);
    }
  }, []);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something Error!</h2>
      <button onClick={() => onClick(state)}>Back to Top</button>
    </div>
  );
}
