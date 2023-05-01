import { useAuthUserStore } from '@/atoms/useAuthUserStore';
import { useEffect } from 'react';
import { usePage } from './usePage';

export const useAuthRedirect = () => {
  const { toHome, toProfile, toLogin } = usePage();
  const authUser = useAuthUserStore((state) => state.authUser);
  useEffect(() => {
    if (authUser !== null) {
      if (!authUser.displayName || !authUser.photoURL) {
        toProfile(authUser.uid);
      } else {
        toHome(authUser.uid);
      }
    } else {
      toLogin();
    }
  }, [
    authUser?.displayName,
    authUser?.photoURL,
    authUser?.uid,
    toHome,
    toLogin,
    toProfile,
  ]);
};
