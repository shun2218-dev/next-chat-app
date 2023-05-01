import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  memo,
  FC,
} from 'react';
import Image from 'next/image';
import { useAuthUser } from '@/hooks/useAuthUser';
import { usePage } from 'hooks/usePage';
import styles from '@/styles/components/UserList.module.scss';
import utilStyles from '@/styles/utils/utils.module.scss';
import {
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from './button';
import CancelModal from './cancelModal';
import { PageParam } from '@/types/PageParam';
import { usePathname } from 'next/navigation';
import { JoinModal } from './joinModal';
import { InviteModal } from './inviteModal';
import { ExitModal } from './exitModal';
import {
  GET_GROUP_INVITATION_USERS,
  GET_GROUP_MEMBERS,
  GET_USERS,
} from 'queries/query';

export type Props = {
  params: PageParam;
  group?: boolean;
};

export type FirebaseData = QueryDocumentSnapshot<DocumentData>;

const UserListMemo: FC<Props> = ({ params, group = false }) => {
  const pathname = usePathname();
  const getId = useCallback(() => {
    return pathname?.split('/')[3];
  }, [pathname]);
  const { authUser } = useAuthUser();
  const { toPrivateRoom } = usePage();
  const [roomId, setRoomId] = useState(getId());
  const [ids, setIds] = useState<string[]>([]);
  const [inviteIds, setInviteIds] = useState<string[]>([]);
  const [cancelId, setCancelId] = useState('');
  const [allUsers, setAllUsers] = useState<FirebaseData[]>([]);
  const [users, setUsers] = useState<FirebaseData[]>([]);
  const [inviteUsers, setInviteUsers] = useState<FirebaseData[]>([]);
  const [inviteLists, setInviteLists] = useState<FirebaseData[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const modalToggle = useCallback(
    (target: string) => {
      if (target === 'invite') {
        setInviteOpen(!inviteOpen);
      } else if (target === 'exit') {
        setExitOpen(!exitOpen);
      } else if (target === 'join') {
        setJoinOpen(!joinOpen);
      } else if (target === 'cancel') {
        setCancelOpen(!cancelOpen);
      }
    },
    [joinOpen, exitOpen, inviteOpen, cancelOpen]
  );

  const isGroupActiveStyle = useMemo(
    () => (group ? styles.active : ''),
    [group]
  );
  const isNotMember = useCallback(
    (snapshot: QuerySnapshot<DocumentData>) => {
      const isMember = snapshot.docs
        .map(({ id }) => id)
        .includes(authUser?.uid!);
      return !isMember;
    },
    [authUser?.uid]
  );

  const isGroupStyle: string = useMemo(
    () => (roomId && group ? styles.group : ''),
    [roomId, group]
  );

  useEffect(() => {
    setRoomId(getId());
  }, [pathname, getId]);

  useEffect(() => {
    const unSubUser = onSnapshot(GET_USERS(), (snapshot) => {
      setAllUsers([...snapshot.docs.map((doc) => doc)]);
    });
    return () => {
      unSubUser();
    };
  }, []);

  useEffect(() => {
    if (group && roomId) {
      const unSub = onSnapshot(GET_GROUP_MEMBERS(roomId), (snapshot) => {
        if (isNotMember(snapshot) && !joinOpen) {
          setJoinOpen(true);
        } else {
          setJoinOpen(false);
        }
        setUsers([...snapshot.docs.map((doc) => doc)]);
        setIds([...snapshot.docs.map((doc) => doc.id)]);
      });
      return () => {
        unSub();
      };
    } else {
      const unSub = onSnapshot(GET_USERS(), (snapshot) => {
        setUsers([...snapshot.docs.filter((doc) => doc.id !== authUser?.uid!)]);
        setIds([...snapshot.docs.map((doc) => doc.id)]);
      });
      return () => {
        unSub();
      };
    }
  }, [authUser?.uid, group, isNotMember, roomId]);

  useEffect(() => {
    const notMembers = allUsers.filter(
      (user) => ids.includes(user.id) === false
    );
    const notInvited = notMembers.filter(
      (member) => inviteIds.includes(member.id) === false
    );
    setInviteUsers([...notInvited]);
  }, [allUsers, ids, inviteIds]);

  useEffect(() => {
    if (roomId && group) {
      const unSub = onSnapshot(
        GET_GROUP_INVITATION_USERS(roomId),
        (snapshot) => {
          setInviteLists([...snapshot.docs.map((doc) => doc)]);
          setInviteIds([...snapshot.docs.map((doc) => doc.id)]);
        }
      );
      return () => {
        unSub();
      };
    }
  }, [roomId, group]);
  return (
    <>
      <JoinModal params={params} open={joinOpen} modalToggle={modalToggle} />
      <InviteModal
        params={params}
        open={inviteOpen}
        modalToggle={modalToggle}
        inviteUsers={inviteUsers}
        inviteIds={inviteIds}
        setInviteIds={setInviteIds}
      />
      <ExitModal params={params} open={exitOpen} modalToggle={modalToggle} />
      <CancelModal
        params={params}
        open={cancelOpen}
        modalToggle={modalToggle}
        cancelId={cancelId}
        setCancelId={setCancelId}
      />
      <div className={styles.container}>
        <p className={styles.listTitle}>
          {group ? 'Members' : 'Users'} {`(${users.length})`}
        </p>
        <ul className={styles.memberList}>
          <ul className={[styles.userList, isGroupStyle].join(' ')}>
            {users.length ? (
              users.map((user) => (
                <li
                  key={user.id}
                  className={[
                    styles.user,
                    roomId === user.id ? styles.active : styles.passive,
                    isGroupActiveStyle,
                  ].join(' ')}
                  onClick={() => {
                    !group && toPrivateRoom(authUser?.uid!, user.id);
                  }}
                >
                  {user.data().photoURL ? (
                    <Image
                      width={60}
                      height={60}
                      src={user.data().photoURL}
                      alt=""
                      className={utilStyles.avatar}
                    />
                  ) : (
                    <AccountCircleIcon
                      sx={{
                        width: 60,
                        height: 60,
                        '@media screen and (max-width:1000px)': {
                          width: 40,
                          height: 40,
                        },
                      }}
                    />
                    // <div>Account Circle</div>
                  )}
                  <p>{user.data().displayName ?? 'Unknown'}</p>
                </li>
              ))
            ) : (
              <div className={styles.loading}>loading...</div>
            )}
          </ul>

          {group && (
            <>
              <li
                className={styles.listTitle}
              >{`Invitation (${inviteLists.length})`}</li>
              <ul className={[styles.userList, styles.invite].join(' ')}>
                {inviteLists.length ? (
                  inviteLists.map((inviteList) => (
                    <li
                      key={inviteList.id}
                      className={styles.user}
                      onClick={() => {
                        modalToggle('cancel');
                        setCancelId(inviteList.id);
                      }}
                    >
                      <Image
                        src={inviteList.data().photoURL}
                        alt=""
                        className={utilStyles.avatar}
                        width={60}
                        height={60}
                      />
                      <p>{inviteList.data().displayName}</p>
                    </li>
                  ))
                ) : (
                  <div
                    className={[utilStyles.textCenter, styles.nobody].join(' ')}
                  >
                    Nobody invited
                  </div>
                )}
              </ul>
              <div className={styles.buttonGroup}>
                <Button
                  type="button"
                  color="success"
                  variant="outlined"
                  fullWidth
                  onClick={() => modalToggle('invite')}
                >
                  Invite
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={() => modalToggle('exit')}
                >
                  Exit
                </Button>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export const UserList = memo(UserListMemo);
