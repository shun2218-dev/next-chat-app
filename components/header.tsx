import React, { FC, memo, ReactNode, useTransition, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { usePage } from '@/hooks/usePage';
import styles from '@/styles/components/Header.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthUserStore } from '@/atoms/useAuthUserStore';
import { useSignOut } from '@/hooks/useSignOut';
import { HeaderLogo } from './headerLogo';

const Button = dynamic(() => import('@/components/button'));
const SignOutIcon = dynamic(() => import('@/icons/signOutIcon'));

type Props = {
  children?: ReactNode;
};

const Header: FC<Props> = memo(function HeaderMemo({ children }) {
  const { toProfile } = usePage();
  const pathname = usePathname();
  const authUser = useAuthUserStore((state) => state.authUser);
  const [isPending, startTransition] = useTransition();
  const { signOut, error, loading } = useSignOut();
  const isLoginStyle = useMemo(
    () => (authUser?.uid ? styles.login : styles.notLogin),
    [authUser?.uid]
  );

  return (
    <>
      {pathname !== '/start' && pathname !== '/' && (
        <header className={[styles.header, isLoginStyle].join(' ')}>
          {/* after log in switch toHome */}
          <HeaderLogo />

          {authUser && !isPending && (
            <div className={styles.profile}>
              <p>{authUser.displayName}</p>
              {authUser.photoURL ? (
                <Image
                  src={authUser.photoURL}
                  alt=""
                  className={styles.avatar}
                  onClick={() => toProfile(authUser.uid)}
                  width={60}
                  height={60}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    width: 60,
                    height: 60,
                    '@media screen and (max-width:600px)': {
                      width: 40,
                      height: 40,
                    },
                  }}
                  onClick={() => toProfile(authUser?.uid)}
                />
                // <div>Account CirCle</div>
              )}
              <Button
                testid="signout-btn"
                type="button"
                variant="outlined"
                color="primary"
                onClick={async () => {
                  try {
                    await signOut();
                  } catch (err: any) {
                    if (error) {
                      console.log(error.message);
                    }
                  }
                }}
                startIcon={<SignOutIcon />}
                header
                disabled={loading}
              >
                Sign Out
              </Button>
            </div>
          )}
          {children}
        </header>
      )}
    </>
  );
});

export default Header;
