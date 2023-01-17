"use client";
import { useEffect, useTransition } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { PageParam } from "@/types/PageParam";
import { useSignOut } from "@/hooks/useSignOut";
import styles from "@/styles/layout.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
// import { RecoilRoot } from "recoil";

const Button = dynamic(() => import("@/components/button"));
const SignOutIcon = dynamic(() => import("@/icons/signOutIcon"));
const Header = dynamic(() => import("@/components/header"));

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: PageParam;
}) {
  const authUser = useAuthUser();
  const { toProfile, toLogin } = usePage();
  const [isPending, startTransition] = useTransition();
  const { signOut, error, loading } = useSignOut();
  useEffect(() => {
    if (authUser?.uid) {
      if (!authUser?.displayName || !authUser.photoURL) {
        toProfile(authUser?.uid!);
      }
    } else {
      toLogin();
    }
  }, [
    authUser?.displayName,
    authUser?.photoURL,
    authUser?.uid,
    toLogin,
    toProfile,
  ]);
  return (
    <>
      <Header params={params}>
        {authUser && !isPending && (
          <div className={styles.profile}>
            <p>{authUser.displayName}</p>
            {authUser.photoURL ? (
              <Image
                src={authUser.photoURL}
                alt=""
                className={styles.avatar}
                onClick={() => toProfile(authUser.uid!)}
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
      </Header>
      {children}
    </>
  );
}
