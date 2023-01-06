"use client";
import React, { FC } from "react";
import styles from "@/styles/pages/Group.module.scss";
import { usePage } from "@/hooks/usePage";

import Card from "@/components/card";
import { PageParam } from "@/types/PageParam";

type Props = {
  params: PageParam;
};

const Group: FC<Props> = ({ params }) => {
  const { toJoin, toCreate } = usePage();
  const { uid } = params;
  return (
    <div className={styles.cardContainer}>
      <Card onClick={() => toJoin(uid!)}>Join a already exists group</Card>
      <Card onClick={() => toCreate(uid!)}>Create a new group</Card>
    </div>
  );
};

export default Group;
