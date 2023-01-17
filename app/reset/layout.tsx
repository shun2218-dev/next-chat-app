"use client";

import { useTransition } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PageParam } from "@/types/PageParam";
import styles from "@/styles/layout.module.scss";
import { useAuthUser } from "@/hooks/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useSignOut } from "@/hooks/useSignOut";
// import { RecoilRoot } from "recoil";

const Button = dynamic(() => import("@/components/button"));
const SignOutIcon = dynamic(() => import("@/icons/signOutIcon"));
const Header = dynamic(() => import("@/components/header"));

export default function ResetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: PageParam;
}) {
  const [isPending, startTransition] = useTransition();
  const { authUser } = useAuthUser();
  const { toProfile } = usePage();
  const { signOut, error, loading } = useSignOut();
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
