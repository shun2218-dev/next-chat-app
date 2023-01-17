import { useEffect } from "react";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const useAuthUser = () => {
  const { getState } = useAuthUserStore;
  //   const login = useAuthUserStore((state) => state.login);
  //   const logout = useAuthUserStore((state) => state.logout);

  useEffect(() => {
    const unsubscribe =
      // subscribe(
      //   (state) => state.authUser,

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName } = user;
          const authUser = {
            uid,
            email,
            displayName,
          };
          //   login(authUser);
        } else {
          //   logout();
        }
      });
    // );
    return () => {
      unsubscribe();
    };
  }, []);

  return getState();
};
