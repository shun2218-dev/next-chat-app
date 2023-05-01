import { db } from '@/firebase';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { GET_USERS, GET_USER_BY_ID } from 'queries/query';

export const getUserInfo = async (uid: string) => {
  const docSnap = await getDoc(GET_USER_BY_ID(uid));
  if (docSnap.exists()) {
    const user = docSnap.data();
    return user;
  }
};
export const getAllUsersInfo = async () => {
  const usersSnapshot = await getDocs(GET_USERS());
  return usersSnapshot.docs;
};

export const getUserIds = async () => {
  const docs = await getAllUsersInfo();
  const ids = docs.map((doc) => doc.id);
  return ids;
};

export const getMemberInfo = async (groupid: string, from: string) => {
  const memberRef = doc(db, 'groups', groupid, 'members', from);
  const docSnap = await getDoc(memberRef);
  if (docSnap.exists()) {
    const member = docSnap.data();
    return member;
  }
};
