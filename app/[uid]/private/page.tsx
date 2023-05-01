'use client';
import React, { memo, useEffect, FC } from 'react';

import { PageParam } from '@/types/PageParam';
import { getAllUsersInfo } from '@/utils/getUserInfo';
import { useRouter } from 'next/navigation';

type Props = {
  params: PageParam;
};

const PrivateRoomMemo: FC<Props> = ({ params }) => {
  const { uid } = params;
  const router = useRouter();
  useEffect(() => {
    getAllUsersInfo().then((users) => {
      const firstUserId = users[0].data().uid;
      router.push(`/${uid}/private/${firstUserId}`);
    });
  }, [router, uid]);

  return <div>loading...</div>;
};

const PrivateRoom = memo(PrivateRoomMemo);
export default PrivateRoom;
