'use client';
import React, { FC } from 'react';
import styles from '@/styles/pages/Group.module.scss';

import Card from '@/components/card';
import { PageParam } from '@/types/PageParam';

type Props = {
  params: PageParam;
};

const Group: FC<Props> = ({ params }) => {
  const { uid } = params;
  return (
    <div className={styles.cardContainer}>
      <Card testid="join-card" href={`/${uid}/group/join`}>
        Join a already exists group
      </Card>
      <Card testid="create-card" href={`/${uid}/group/create`}>
        Create a new group
      </Card>
    </div>
  );
};

export default Group;
