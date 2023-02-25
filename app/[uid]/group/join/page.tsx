'use client';
import React, { memo, FC, useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import styles from '@/styles/pages/Join.module.scss';
import utilStyles from '@/styles/utils/utils.module.scss';
import { usePage } from '@/hooks/usePage';
import Form from '@/components/form';
import Image from 'next/image';
import { PageParam } from '@/types/PageParam';
import Link from 'next/link';

type Groups = {
  id: string;
  groupName: string;
  owner: string;
  photoURL: string;
};

type Props = {
  params: PageParam;
};

const Join: FC<Props> = memo(function JoinMemo({ params }) {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { toGroupRoom } = usePage();
  const { uid } = params;

  useEffect(() => {
    setLoading(true);
    const ref = collection(db, 'groups');
    const unSub = onSnapshot(ref, (snapshot) => {
      setGroups(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as Groups;
        })
      );
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <Form title="Group List">
      <ul className={styles.groupList} data-testid="group-list">
        {groups.length ? (
          groups.map(({ id, groupName, photoURL }, i) => (
            <li key={id} data-testid={`group-${i}`}>
              <Link href={`/${uid}/group/${id}`} className={styles.group}>
                <Image
                  src={photoURL}
                  alt={groupName}
                  width={60}
                  height={60}
                  className={utilStyles.avatar}
                />
                <p className={styles.name}>{groupName}</p>
              </Link>
            </li>
          ))
        ) : loading ? (
          <li>...loading</li>
        ) : (
          <li>Not Found</li>
        )}
      </ul>
    </Form>
  );
});

export default Join;
