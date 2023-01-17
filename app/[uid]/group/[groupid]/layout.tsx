"use client";
import React, {
  useState,
  useEffect,
  ReactNode,
  FormEvent,
  useTransition,
} from "react";
import { PageParam } from "@/types/PageParam";
import dynamic from "next/dynamic";
import { useChatMessage } from "@/hooks/useChatMessage";
import styles from "@/styles/pages/Private.module.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthUser } from "@/atoms/useAuthUser";

const MessageInput = dynamic(
  async () => await import("@/components/messageInput")
);
const NotFoundIcon = dynamic(async () => await import("@/icons/notFoundIcon"));
const UserList = dynamic(async () => await import("@/components/userList"));

export default function GroupChatLayout({
  params,
  children,
}: {
  params: PageParam;
  children: ReactNode;
}) {
  const { uid, groupid } = params;
  const { chatMessages, chatRoom, dataLoading, setLoading } = useChatMessage(
    true,
    params
  );
  const [message, setMessage] = useState("");
  const [notHistory, setNotHistory] = useState(false);
  const authUser = useAuthUser();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      if (!authUser?.displayName || !authUser?.photoURL) {
        alert("Please set up your profile to chat!");
      } else {
        startTransition(() => {
          setLoading(true);
        });
        const groupRef = collection(db, "groups", groupid!, "messages");
        await addDoc(groupRef, {
          message,
          from: uid!,
          createdAt: serverTimestamp(),
        }).then(() => {
          startTransition(() => {
            setMessage("");
          });
        });
        startTransition(() => {
          setLoading(false);
        });
      }
    }
  };
  useEffect(() => {
    if (!dataLoading && chatMessages.length === 0 && chatRoom === "") {
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
      <UserList params={params} group />
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
