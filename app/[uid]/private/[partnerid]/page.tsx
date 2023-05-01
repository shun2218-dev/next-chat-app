'use client';
import React, { memo, Fragment, FC } from 'react';
import { useChatMessage } from '@/hooks/useChatMessage';
import { formatDate } from '@/utils/formatDate';

import { ChatMessage } from '@/components/chatMessage';
import MessageDate from '@/components/messageDate';
import { PageParam } from '@/types/PageParam';

type Props = {
  params: PageParam;
};

const PrivateRoomMemo: FC<Props> = ({ params }) => {
  const { chatMessages } = useChatMessage(false, params);

  return (
    <>
      {chatMessages.map((doc, index) => {
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
      })}
    </>
  );
};

const PrivateRoom = memo(PrivateRoomMemo);
export default PrivateRoom;
