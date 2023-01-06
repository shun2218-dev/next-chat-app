"use client";
import React, { memo, useEffect, FC } from "react";

import { PageParam } from "@/types/PageParam";
import { getAllUsersInfo } from "@/utils/getUserInfo";
import { useRouter } from "next/navigation";

type Props = {
  params: PageParam;
};

const PrivateRoom: FC<Props> = memo(function PrivateRoomMemo({ params }) {
  const { uid } = params;
  const router = useRouter();
  useEffect(() => {
    getAllUsersInfo().then((users) => {
      const firstUserId = users[0].data().uid;
      router.push(`/${uid}/private/${firstUserId}`);
    });
  }, []);

  return <div>loading...</div>;
});

export default PrivateRoom;
