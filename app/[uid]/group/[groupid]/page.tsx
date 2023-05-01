'use client';

import React, { memo, Fragment, FC, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { formatDate } from '@/utils/formatDate';
import { useChatMessage } from '@/hooks/useChatMessage';

const ChatMessage = dynamic(
  async () =>
    await import('@/components/chatMessage').then((mod) => mod.ChatMessage)
);
const MessageDate = dynamic(
  async () => await import('@/components/messageDate')
);
import { PageParam } from '@/types/PageParam';

type Props = {
  params: PageParam;
};

const GroupRoomMemo: FC<Props> = ({ params }) => {
  const [isPending] = useTransition();
  const { chatMessages } = useChatMessage(true, params);

  return (
    <>
      {chatMessages.length ? (
        chatMessages.map((doc, index) => {
          if (doc.createdAt !== null) {
            const targetDate = formatDate(doc);
            const isLastMessage = chatMessages.length - 1 === index;
            if (index === 0) {
              return (
                <Fragment key={doc.id}>
                  <MessageDate {...targetDate} />
                  <ChatMessage {...doc} isLastMessage={isLastMessage} />
                </Fragment>
              );
            } else {
              const preDate = formatDate(chatMessages[index - 1]);
              if (
                preDate.month === targetDate.month &&
                preDate.day === targetDate.day
              ) {
                return (
                  <ChatMessage
                    key={doc.id}
                    {...doc}
                    isLastMessage={isLastMessage}
                  />
                );
              } else {
                return (
                  <Fragment key={doc.id}>
                    <MessageDate {...targetDate} />
                    <ChatMessage {...doc} isLastMessage={isLastMessage} />
                  </Fragment>
                );
              }
            }
          }
        })
      ) : isPending ? (
        <div>...loading</div>
      ) : (
        <div>No history.</div>
      )}
    </>
  );
};

const GroupRoom = memo(GroupRoomMemo);
export default GroupRoom;
