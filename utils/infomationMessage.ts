import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getUserInfo } from './getUserInfo';
import { INSERT_GROUP_MESSAGE } from 'queries/query';

export const informationMessage = async (
  from: string,
  groupid: string,
  status: 'existed' | 'joined' | 'invited' | 'canceled',
  to?: string
) => {
  await getUserInfo(from).then(async (userInfo) => {
    if (userInfo) {
      await addDoc(INSERT_GROUP_MESSAGE(groupid), {
        from,
        displayName: userInfo.displayName,
        createdAt: serverTimestamp(),
        info: true,
        status,
        to: to ?? '',
      });
    }
  });
};
