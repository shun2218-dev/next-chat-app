'use client';
import React, { useState, useEffect, ReactNode, FormEvent } from 'react';
import { PageParam } from '@/types/PageParam';
import MessageInput from '@/components/messageInput';
import { useChatMessage } from '@/hooks/useChatMessage';
import styles from '@/styles/pages/Private.module.scss';
import isCreatedRoom from '@/utils/private/isCreatedRoom';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '@/firebase';
import NotFoundIcon from '@/icons/notFoundIcon';
import { useTransition } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uploadChatImage } from '@/utils/uploadChatImage';

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
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
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
        const roomRef = collection(db, 'rooms', `${roomid}`, 'messages');
        const res = await addDoc(roomRef, {
          message,
          from: uid,
          createdAt: serverTimestamp(),
          image: null,
        });
        if (image) {
          await uploadChatImage(res.id, roomid, image);
        }
      }
      startTransition(() => {
        setLoading(false);
        setMessage('');
        setImage(null);
      });
    }
  };

  useEffect(() => {
    if (
      !dataLoading &&
      chatMessages.length === 0 &&
      chatRoom === '' &&
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
        testid="private-message-input"
        onSubmit={onSubmit}
        loading={isPending}
        state={message}
        imageState={image}
        setState={setMessage}
        setImageState={setImage}
      />
    </>
  );
}
