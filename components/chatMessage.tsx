import React, { useState, useEffect, FC, memo } from "react";
import { Skeleton } from "@mui/material";
import { formatTime } from "@/utils/formatTime";
import { getUserInfo } from "@/utils/getUserInfo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "@/styles/components/ChatMessage.module.scss";
import { Message } from "@/types/Message";

import Avatar from "./avatar";
import InfoMessage from "./infoMessage";
import { useSmoothScroll } from "hooks/useSmoothScroll";
import { useAuthUser } from "@/hooks/useAuthUser";

type Info = {
  displayName: string;
  photoURL: string | null;
};

const ChatMessage: FC<Message> = memo(function ChatMessage({
  from,
  to,
  createdAt,
  id,
  message,
  info,
  status,
  displayName,
  isLastMessage,
}) {
  // const { uid, partnerid, groupid } = useParams();
  const { authUser } = useAuthUser();
  const [userInfo, setUserInfo] = useState<Info>({
    displayName: "",
    photoURL: "",
  });
  const { chatRef, smoothScroll } = useSmoothScroll(isLastMessage);

  useEffect(() => {
    smoothScroll(chatRef);
  }, [chatRef, smoothScroll]);
  // const [partnerName, setPartnerName] = useState("");
  // const [partnerPhoto, setPartnerPhoto] = useState("");

  // const getPartnerInfo = async (partnerid: string) => {
  //   const userRef = doc(db, "users", partnerid);
  //   const snapshot = await getDoc(userRef);
  //   return {
  //     displayName: snapshot.data()!.displayName,
  //     photoURL: snapshot.data()!.photoURL,
  //   };
  // };

  // const getFromInfo = async (from: string, groupid: string) => {
  //   const fromRef = doc(db, "groups", groupid, "members", from);
  //   const snapshot = await getDoc(fromRef);
  //   if (snapshot.data()) {
  //     return {
  //       displayName: snapshot?.data()?.displayName,
  //       photoURL: snapshot?.data()?.photoURL,
  //     };
  //   } else {
  //     return {
  //       displayName: "Unknown",
  //       photoURL: snapshot?.data()?.photoURL,
  //     };
  //   }
  // };

  useEffect(() => {
    getUserInfo(from).then((user) => {
      if (user) {
        setUserInfo({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUserInfo({
          displayName: "Unknown",
          photoURL: null,
        });
      }
    });
    // Set Unknown user if the user is existed.
    // if (partnerid) {
    //   getPartnerInfo(partnerid).then(({ displayName, photoURL }) => {
    //     setPartnerName(displayName);
    //     setPartnerPhoto(photoURL);
    //   });
    // } else if (groupid) {
    //   getFromInfo(from, groupid).then(({ displayName, photoURL }) => {
    //     setPartnerName(displayName);
    //     setPartnerPhoto(photoURL);
    //   });
    // }
  }, [from]);

  return (
    <>
      {info ? (
        <InfoMessage
          status={status!}
          to={to!}
          from={from}
          isLastMessage={isLastMessage}
        />
      ) : from === authUser?.uid ? (
        <ul className={`${styles.message} ${styles.own}`} ref={chatRef}>
          <li className={styles.text}>
            <p className={styles.bubble}>{message}</p>
            {createdAt !== null && (
              <p className={styles.time}>{formatTime(createdAt)}</p>
            )}
          </li>
        </ul>
      ) : (
        <ul className={`${styles.message} ${styles.partner}`} ref={chatRef}>
          <li className={styles.profile}>
            {userInfo.photoURL ? (
              <Avatar size={40} storageRef={userInfo.photoURL} chat />
            ) : (
              <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
              // <div>Account Circle</div>
            )}
            <p>
              {userInfo.displayName !== undefined
                ? userInfo.displayName
                : "Unknown"}
            </p>
          </li>
          <li className={styles.text}>
            <p className={styles.bubble}>{message}</p>
            {createdAt !== null ? (
              <p className={styles.time}>{formatTime(createdAt)}</p>
            ) : (
              <Skeleton variant="text" width={40} height={24} />
              // <div>loading...</div>
            )}
          </li>
        </ul>
      )}
    </>
  );
});

export default ChatMessage;
