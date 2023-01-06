import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const registRoom = async (uid: string, partnerid: string, roomid: string) => {
  const partnerRef = doc(db, "users", partnerid, "rooms", uid);
  await setDoc(partnerRef, { roomid });
};

const createRoom = async (
  id: string,
  uid: string,
  partnerid: string,
  message: string
) => {
  await addDoc(collection(db, "rooms"), { owner: uid, partner: partnerid })
    .then(async (res) => {
      await registRoom(uid, partnerid, res.id);
      await registRoom(partnerid, uid, res.id);
      id = res.id;
      return res.id;
    })
    .then(async (roomid) => {
      const roomRef = collection(db, "rooms", `${roomid}`, "messages");
      await addDoc(roomRef, {
        message,
        from: uid,
        createdAt: serverTimestamp(),
      });
    });
  return { exist: false, roomid: id };
};

const isCreatedRoom = async (
  uid: string,
  partnerid: string,
  message: string
) => {
  const ref = collection(db, "users", `${uid}`, "rooms");
  const querySnapshot = await getDocs(ref);
  const filtered = querySnapshot.docs.filter((doc) => doc.id === partnerid);
  let id: string = "";
  if (filtered[0] !== undefined) {
    id = filtered[0].data().roomid;
    return { exist: true, roomid: id };
  } else {
    return createRoom(id, uid, partnerid, message);
  }
};

export default isCreatedRoom;
