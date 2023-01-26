import { db, storage } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadChatImage = async (
  chatid: string,
  roomid: string,
  image: File,
  group = false
) => {
  const imagePath = group
    ? `chatImages/group/${roomid}/${chatid}_${image!.name}`
    : `chatImages/private/${roomid}/${chatid}_${image!.name}`;
  const docPath = group ? "groups" : "rooms";
  const imageRef = ref(storage, imagePath);
  await uploadBytes(imageRef, image!);
  const url = await getDownloadURL(imageRef);
  const roomRef = doc(db, docPath, roomid, "messages", chatid);
  await updateDoc(roomRef, { image: url });
};
