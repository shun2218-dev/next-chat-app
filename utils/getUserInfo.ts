import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getUserInfo = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return user;
  }
};
export const getAllUsersInfo = async () => {
  const userRef = collection(db, "users");
  const usersSnapshot = await getDocs(userRef);
  return usersSnapshot.docs;
};

export const getUserIds = async () => {
  const docs = await getAllUsersInfo();
  const ids = docs.map((doc) => doc.id);
  return ids;
};

export const getMemberInfo = async (groupid: string, from: string) => {
  const memberRef = doc(db, "groups", groupid, "members", from);
  const docSnap = await getDoc(memberRef);
  if (docSnap.exists()) {
    const member = docSnap.data();
    return member;
  }
};
