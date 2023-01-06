import { Timestamp } from "firebase/firestore";

export type InformationMessage = {
  from: string;
  displayName: string;
  createdAt: Timestamp;
  info: boolean;
  status: "joined" | "existed" | "invited" | "canceled";
};
