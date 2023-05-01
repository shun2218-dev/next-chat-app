'use client';
import React, { memo } from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import styles from '@/styles/pages/Home.module.scss';
// import { useFlashMessage } from "@/hooks/useFlashMessage";

import Card from '@/components/card';
// import FlashMessage from "@/components/flashMessage";
import PrivateIcon from '@/icons/privateIcon';
import GroupIcon from '@/icons/groupIcon';

const Home = () => {
  const { authUser } = useAuthUser();
  return (
    <>
      {/* {flashState && <FlashMessage {...messageState!} />} */}
      <div className={styles.cardContainer}>
        <Card
          testid="private-card"
          startIcon={<PrivateIcon title />}
          href={`/${authUser?.uid}/private`}
        >
          Private Chat
        </Card>
        <Card
          testid="group-card"
          startIcon={<GroupIcon title />}
          href={`/${authUser?.uid}/group`}
        >
          Group Chat
        </Card>
      </div>
    </>
  );
};

export default Home;
