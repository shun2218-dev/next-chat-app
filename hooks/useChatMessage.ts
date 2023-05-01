'use client';

import { Message } from '@/types/Message';
import { PageParam } from '@/types/PageParam';
import { getDoc, getDocs, onSnapshot, orderBy } from 'firebase/firestore';
import {
  GET_GROUP_MESSAGES,
  GET_PRIVATE_MESSAGES,
  GET_PRIVATE_ROOMS,
  GET_PRIVATE_ROOM_BY_ID,
} from 'queries/query';
import { useEffect, useMemo, useState } from 'react';

export const useChatMessage = (
  group: boolean = false,
  pageParams: PageParam
) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatRoom, setChatRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [roomExist, setRoomExist] = useState(true);
  const messageOptions = useMemo(() => [orderBy('createdAt', 'asc')], []);
  const { uid, partnerid, groupid } = pageParams;
  const getRoomId = async (uid: string, roomDocId: string) => {
    let roomid: string = '';
    await getDoc(GET_PRIVATE_ROOM_BY_ID(uid, roomDocId)).then((res) => {
      roomid = res.data()!.roomid;
    });
    return roomid;
  };

  useEffect(() => {
    if (!group && chatRoom) {
      const unSub = onSnapshot(
        GET_PRIVATE_MESSAGES(chatRoom, messageOptions),
        (snapshot) => {
          setChatMessages([
            ...snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() } as Message;
            }),
          ]);
        }
      );
      return () => {
        unSub();
      };
    }
  }, [chatRoom, group, messageOptions]);

  useEffect(() => {
    if (!group && partnerid) {
      setDataLoading(true);
      const unSubUser = onSnapshot(GET_PRIVATE_ROOMS(uid!), (snapshot) => {
        const room = snapshot.docs.filter((doc) => doc.id === partnerid);
        if (room.length && uid) {
          const roomDocId = room[0].id;
          getRoomId(uid, roomDocId).then((roomid) => {
            setChatRoom(roomid);
            getDocs(GET_PRIVATE_MESSAGES(roomid, messageOptions)).then(
              (snapshot) => {
                setChatMessages([
                  ...snapshot.docs.map((doc) => {
                    return {
                      id: doc.id,
                      ...doc.data(),
                    } as Message;
                  }),
                ]);
              }
            );
          });
          setDataLoading(false);
        } else {
          setDataLoading(false);
        }
      });

      setChatMessages([]);
      setChatRoom('');
      return () => {
        unSubUser();
      };
    }

    if (!roomExist) {
      setChatRoom('');
    }
  }, [group, pageParams, partnerid, roomExist, uid]);

  useEffect(() => {
    if (groupid) {
      const unSub = onSnapshot(
        GET_GROUP_MESSAGES(groupid, messageOptions),
        (snapshot) => {
          setChatMessages([
            ...snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() } as Message;
            }),
          ]);
        }
      );
      return () => {
        unSub();
      };
    }
  }, [groupid, messageOptions]);

  return {
    chatMessages,
    chatRoom,
    setChatRoom,
    setLoading,
    loading,
    dataLoading,
    setRoomExist,
    roomExist,
  };
};
