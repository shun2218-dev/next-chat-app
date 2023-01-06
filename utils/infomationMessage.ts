import { db } from "@/firebase";
import { InformationMessage } from "@/types/InformationMessage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getUserInfo } from "./getUserInfo";

export const informationMessage = async (
  from: string,
  groupid: string,
  status: "existed" | "joined" | "invited" | "canceled",
  to?: string
) => {
  const messageRef = collection(db, "groups", groupid, "messages");
  await getUserInfo(from).then(async (userInfo) => {
    if (userInfo) {
      await addDoc(messageRef, {
        from,
        displayName: userInfo.displayName,
        createdAt: serverTimestamp(),
        info: true,
        status,
        to: to ?? "",
      });
    }
  });
};
