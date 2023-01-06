import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  message?: string;
  createdAt: Timestamp;
  from: string;
  info?: boolean;
  status?: "joined" | "existed" | "invited" | "canceled";
  displayName?: string;
  to?: string;
  isLastMessage: boolean;
};
