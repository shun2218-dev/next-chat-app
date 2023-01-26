"use client";
import React, { memo } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { usePage } from "hooks/usePage";
import styles from "@/styles/pages/Home.module.scss";
// import { useFlashMessage } from "@/hooks/useFlashMessage";

import Card from "@/components/card";
// import FlashMessage from "@/components/flashMessage";
import PrivateIcon from "@/icons/privateIcon";
import GroupIcon from "@/icons/groupIcon";

const Home = memo(function HomeMemo() {
  const { authUser } = useAuthUser();
  const { toPrivate, toGroup } = usePage();
  // const { messageState, flashState } = useFlashMessage(10000);

  return (
    <>
      {/* {flashState && <FlashMessage {...messageState!} />} */}
      <div className={styles.cardContainer}>
        <Card
          startIcon={<PrivateIcon title />}
          href={`/${authUser?.uid}/private`}
        >
          Private Chat
        </Card>
        <Card startIcon={<GroupIcon title />} href={`/${authUser?.uid}/group`}>
          Group Chat
        </Card>
      </div>
    </>
  );
});

export default Home;
