"use client";
import React, { useState, useEffect, ReactNode, FormEvent } from "react";
import { PageParam } from "@/types/PageParam";
import MessageInput from "@/components/messageInput";
import { useChatMessage } from "@/hooks/useChatMessage";
import styles from "@/styles/pages/Private.module.scss";
import isCreatedRoom from "@/utils/private/isCreatedRoom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import NotFoundIcon from "@/icons/notFoundIcon";
import { useTransition } from "react";

export default function PrivateChatLayout({
  params,
  children,
}: {
  params: PageParam;
  children: ReactNode;
}) {
  const { uid, partnerid } = params;
  const {
    chatMessages,
    chatRoom,
    dataLoading,
    roomExist,
    setLoading,
    setChatRoom,
    setRoomExist,
  } = useChatMessage(false, params);
  const [message, setMessage] = useState("");
  const [notHistory, setNotHistory] = useState(false);
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uid && partnerid) {
      startTransition(() => {
        setLoading(true);
      });
      const { exist, roomid } = await isCreatedRoom(uid, partnerid, message);
      startTransition(() => {
        setChatRoom(roomid);
        setRoomExist(exist);
      });
      if (exist) {
        const roomRef = collection(db, "rooms", `${roomid}`, "messages");
        addDoc(roomRef, {
          message,
          from: uid,
          createdAt: serverTimestamp(),
        });
      }
      startTransition(() => {
        setLoading(false);
        setMessage("");
      });
    }
  };
  useEffect(() => {
    if (
      !dataLoading &&
      chatMessages.length === 0 &&
      chatRoom === "" &&
      roomExist
    ) {
      setTimeout(() => {
        startTransition(() => {
          setNotHistory(true);
        });
      }, 1000);
    } else if (chatMessages.length !== 0) {
      startTransition(() => {
        setNotHistory(false);
      });
    }
  }, [dataLoading]);
  return (
    <>
      <div className={styles.chatRoom}>
        {dataLoading ? (
          <div className={styles.load}>
            {/* <CircularProgress /> */}
            <p>loading...</p>
          </div>
        ) : chatMessages.length === 0 ? (
          notHistory && (
            <div className={styles.notFound}>
              <NotFoundIcon />
              <p>
                No history found. <br />
                You have not started a conversation with this person yet.
              </p>
            </div>
          )
        ) : (
          children
        )}
      </div>
      <MessageInput
        onSubmit={onSubmit}
        loading={isPending}
        state={message}
        setState={setMessage}
      />
    </>
  );
}
