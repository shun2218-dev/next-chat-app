import React, { useEffect, useCallback, useState, memo, FC } from "react";
import Image from "next/image";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "hooks/usePage";
import styles from "@/styles/components/UserList.module.scss";
import utilStyles from "@/styles/utils/utils.module.scss";
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "./button";
import JoinModal from "./joinModal";
import ExitModal from "./exitModal";
import InviteModal from "./inviteModal";
import CancelModal from "./cancelModal";
import { PageParam } from "@/types/PageParam";
import { usePathname } from "next/navigation";

export type Props = {
  params: PageParam;
  group?: boolean;
};

export type FirebaseData = QueryDocumentSnapshot<DocumentData>;

const UserList: FC<Props> = memo(function UserListMemo({
  params,
  group = false,
}) {
  const pathname = usePathname();
  const getId = useCallback(() => {
    return pathname?.split("/")[3];
  }, [pathname]);
  const authUser = useAuthUser();
  const { toPrivateRoom } = usePage();
  const [roomId, setRoomId] = useState(getId());
  const [ids, setIds] = useState<string[]>([]);
  const [inviteIds, setInviteIds] = useState<string[]>([]);
  const [cancelId, setCancelId] = useState("");
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
      if (target === "invite") {
        setInviteOpen(!inviteOpen);
      } else if (target === "exit") {
        setExitOpen(!exitOpen);
      } else if (target === "join") {
        setJoinOpen(!joinOpen);
      } else if (target === "cancel") {
        setCancelOpen(!cancelOpen);
      }
    },
    [joinOpen, exitOpen, inviteOpen, cancelOpen]
  );

  const isNotMember = useCallback(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      doc.id !== authUser?.uid;
    },
    [authUser?.uid]
  );

  useEffect(() => {
    setRoomId(getId());
  }, [pathname, getId]);

  useEffect(() => {
    const userRef = collection(db, "users");
    const unSubUser = onSnapshot(userRef, (snapshot) => {
      setAllUsers([...snapshot.docs.map((doc) => doc)]);
    });
    if (group && roomId) {
      const groupRef = collection(db, "groups", roomId, "members");
      const unSub = onSnapshot(groupRef, (snapshot) => {
        if (snapshot.docs.every(isNotMember) && !joinOpen) {
          setJoinOpen(true);
        } else {
          setJoinOpen(false);
        }
        setUsers([...snapshot.docs.map((doc) => doc)]);
        setIds([...snapshot.docs.map((doc) => doc.id)]);
      });
      return () => {
        unSub();
        unSubUser();
      };
    } else {
      const unSub = onSnapshot(userRef, (snapshot) => {
        setUsers([...snapshot.docs.filter((doc) => doc.id !== authUser?.uid!)]);
        setIds([...snapshot.docs.map((doc) => doc.id)]);
      });
      return () => {
        unSub();
        unSubUser();
      };
    }
  }, [authUser?.uid, group, roomId, isNotMember, joinOpen]);

  useEffect(() => {
    const members = allUsers.filter((user) => ids.includes(user.id) === false);
    const invited = members.filter(
      (member) => inviteIds.includes(member.id) === false
    );
    setInviteUsers([...invited]);
  }, []);

  useEffect(() => {
    if (roomId && group) {
      const inviteRef = collection(db, "groups", roomId, "invitations");
      const unSub = onSnapshot(inviteRef, (snapshot) => {
        setInviteLists([...snapshot.docs.map((doc) => doc)]);
        setInviteIds([...snapshot.docs.map((doc) => doc.id)]);
      });
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
          {group ? `Members (${users.length})` : "Users"}
        </p>
        <ul className={styles.memberList}>
          <ul
            className={`${styles.userList} ${
              roomId && group ? styles.group : ""
            }`}
          >
            {users.length ? (
              users.map((user) => (
                <li
                  key={user.id}
                  className={`${styles.user} ${
                    roomId === user.id ? styles.active : styles.passive
                  } ${group ? styles.active : ""}`}
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
                    // <AccountCircleIcon
                    //   sx={{
                    //     width: 60,
                    //     height: 60,
                    //     "@media screen and (max-width:1000px)": {
                    //       width: 40,
                    //       height: 40,
                    //     },
                    //   }}
                    // />
                    <div>Account Circle</div>
                  )}
                  <p>{user.data().displayName ?? "Unknown"}</p>
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
              <ul className={`${styles.userList} ${styles.invite}`}>
                {inviteLists.length ? (
                  inviteLists.map((inviteList) => (
                    <li
                      key={inviteList.id}
                      className={`${styles.user}`}
                      onClick={() => {
                        modalToggle("cancel");
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
                  <div className={`${utilStyles.textCenter}  ${styles.nobody}`}>
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
                  onClick={() => modalToggle("invite")}
                >
                  Invite
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={() => modalToggle("exit")}
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
});

export default UserList;
