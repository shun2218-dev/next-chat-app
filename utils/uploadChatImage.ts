import { updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { INSERT_CHAT_IMAGE, UPDATE_CHAT_DATA } from 'queries/query';

export const uploadChatImage = async (
  chatid: string,
  roomid: string,
  image: File,
  group = false
) => {
  const imageRef = INSERT_CHAT_IMAGE(group, roomid, chatid, image.name);
  await uploadBytes(imageRef, image!);
  const url = await getDownloadURL(imageRef);
  await updateDoc(UPDATE_CHAT_DATA(group, roomid, chatid), { image: url });
};
