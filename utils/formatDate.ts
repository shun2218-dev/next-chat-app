import { Message } from "@/types/Message";

export const formatDate = (doc: Message) => {
  const [yyyy, mm, dd] = doc.createdAt
    .toDate()
    .toLocaleString()
    .split(" ")[0]
    .split("/");
  return {
    year: yyyy,
    month: mm,
    day: dd,
  };
};
