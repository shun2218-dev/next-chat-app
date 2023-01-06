import React, { memo, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useAuthUser } from "@/atoms/useAuthUser";
import { typeOfId, usePage } from "hooks/usePage";
import { useSignOut } from "hooks/useSignOut";
import logo from "/public/logo.svg";
import styles from "@/styles/components/Header.module.scss";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Button from "./button";
import SignOutIcon from "@/icons/signOutIcon";
import { AuthUser } from "@/types/AuthUser";
import Image from "next/image";

const Header = memo(function HeaderMemo() {
  const { toStart, toHome, toProfile } = usePage();
  const authUser = useAuthUser();
  const { signOut, loading, error } = useSignOut();
  const pathname = usePathname();
  const [isPending] = useTransition();

  // const {
  //   pathname,
  //   query: { uid },
  // } = router;

  const logoNavigate = (authUser: AuthUser) => {
    if (authUser) {
      if (!authUser.displayName || !authUser.photoURL) {
        toProfile(typeOfId(authUser.uid!));
      } else {
        toHome(typeOfId(authUser.uid!));
      }
    } else {
      toStart();
    }
  };

  return (
    <>
      {pathname !== "/start" && pathname !== "/" && (
        <header
          className={`${styles.header} ${
            authUser ? styles.login : styles.notLogin
          }`}
        >
          {/* after log in switch toHome */}
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={67}
            onClick={() => logoNavigate(authUser!)}
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
                  onClick={() => toProfile(typeOfId(authUser.uid!))}
                  width={60}
                  height={60}
                />
              ) : (
                // <AccountCircleIcon
                //   sx={{
                //     width: 60,
                //     height: 60,
                //     "@media screen and (max-width:600px)": {
                //       width: 40,
                //       height: 40,
                //     },
                //   }}
                //   onClick={() => toProfile(typeOfId(uid!))}
                // />
                <div>Account CirCle</div>
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
        </header>
      )}
    </>
  );
});

export default Header;
