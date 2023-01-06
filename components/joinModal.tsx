import React, { FC, memo, useEffect, useState } from "react";
import { usePage } from "hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import styles from "@/styles/components/Modal.module.scss";
import utilStyles from "@/styles/utils/utils.module.scss";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getUserInfo } from "@/utils/getUserInfo";
import { informationMessage } from "@/utils/infomationMessage";
import { CustomModal } from "@/types/CustomModal";

import Modal from "./modal";
import Button from "./button";
import Image from "next/image";

const JoinModal: FC<CustomModal> = memo(function JoinModalMemo({
  params,
  open,
  modalToggle,
}) {
  const authUser = useAuthUser();
  const { uid, groupid } = params;
  const { toJoin } = usePage();
  const [groupInfo, setGroupInfo] = useState<DocumentData>({});
  const [profileEmpty, setProfileEmpty] = useState(false);

  const invitationCheck = async (uid: string, groupid: string) => {
    const inviteRef = collection(db, "groups", groupid, "invitations");
    await getDocs(inviteRef).then(async (snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.id);
      if (ids.includes(uid)) {
        const targetRef = doc(db, "groups", groupid, "invitations", uid);
        await deleteDoc(targetRef);
      }
    });
  };
  const joinGroup = async (groupid: string, uid: string) => {
    const membersRef = doc(db, "groups", groupid, "members", uid);
    await getUserInfo(uid)
      .then(async (member) => {
        await setDoc(membersRef, member)
          .then(async () => {
            await informationMessage(uid, groupid, "joined");
          })
          .then(async () => {
            await invitationCheck(uid!, groupid!);
          });
      })
      .finally(() => modalToggle("join"));
  };

  useEffect(() => {
    if (!authUser?.displayName || !authUser.photoURL) {
      setProfileEmpty(true);
    } else {
      setProfileEmpty(false);
    }
  }, [groupInfo, authUser?.displayName, authUser?.photoURL]);

  useEffect(() => {
    if (groupid) {
      const groupRef = doc(
        db,
        "groups",
        typeof groupid! === "string" ? groupid : groupid[0]
      );
      getDoc(groupRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setGroupInfo({ ...docSnapshot.data() });
        }
      });
    }
  }, [groupid]);
  return (
    <>
      <Modal title="Join this group?" open={open} error={profileEmpty}>
        {groupInfo && (
          <>
            <Image
              src={groupInfo.photoURL}
              alt="profile image"
              width={60}
              height={60}
              className={utilStyles.avatar}
            />
            <div>
              <p className={styles.contentTitle}>Group name</p>
              <div className={styles.contentBox}>{groupInfo.groupName}</div>
            </div>
            <div>
              <p className={styles.contentTitle}>Description</p>
              <div className={styles.contentBox}>{groupInfo.description}</div>
            </div>
          </>
        )}
        <div className={`${styles.modalButton} ${styles.row}`}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() =>
              joinGroup(
                typeof groupid! === "string" ? groupid : groupid![0],
                typeof uid! === "string" ? uid : uid![0]
              )
            }
            fullWidth
            disabled={profileEmpty}
          >
            Yes
          </Button>
          <Button
            type="button"
            color="transparent"
            variant="outlined"
            onClick={() => toJoin(typeof uid! === "string" ? uid : uid![0])}
            fullWidth
          >
            No
          </Button>
        </div>
      </Modal>
    </>
  );
});

export default JoinModal;
