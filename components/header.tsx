import React, { FC, memo, ReactNode, useEffect, useTransition } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { usePage } from "@/hooks/usePage";
import logo from "/public/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";
import { useSignOut } from "@/hooks/useSignOut";

const Button = dynamic(() => import("@/components/button"));
const SignOutIcon = dynamic(() => import("@/icons/signOutIcon"));

type Props = {
  children?: ReactNode;
};

const Header: FC<Props> = memo(function HeaderMemo({ children }) {
  const { toStart, toHome, toProfile } = usePage();
  const pathname = usePathname();
  const authUser = useAuthUserStore((state) => state.authUser);
  const [isPending, startTransition] = useTransition();
  const { signOut, error, loading } = useSignOut();

  const logoNavigate = (uid: string | undefined) => {
    if (uid) {
      toHome(uid);
    } else {
      toStart();
    }
  };

  return (
    <>
      {pathname !== "/start" && pathname !== "/" && (
        <header
          className={`${styles.header} ${
            authUser?.uid ? styles.login : styles.notLogin
          }`}
        >
          {/* after log in switch toHome */}
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={67}
            onClick={() => logoNavigate(authUser?.uid)}
            className={styles.logo}
            priority
          />

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
                    "@media screen and (max-width:600px)": {
                      width: 40,
                      height: 40,
                    },
                  }}
                  onClick={() => toProfile(authUser?.uid)}
                />
                // <div>Account CirCle</div>
              )}
              <Button
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
