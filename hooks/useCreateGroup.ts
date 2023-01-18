"use client";
import { db, storage } from "@/firebase";
import { getUserInfo } from "@/utils/getUserInfo";
import { NavigationState } from "@/types/NavigationState";
import { updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { usePage } from "./usePage";

import { useAuthUserStore } from "@/atoms/useAuthUserStore";

export const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { toHome, toGroupRoom, toRedirect } = usePage();
  const authUser = useAuthUserStore((state) => state.authUser);
  // const { uid } = pageParams;

  // if (image && name && uid && email) {
  //   const imageRef = ref(storage, `avaters/${uid}_${image.name}`);
  //   await uploadBytes(imageRef, image).then(() =>
  //     console.log("Uploaded a file")
  //   );
  //   await getDownloadURL(imageRef).then(async (url) => {
  //     await updateProfile(auth.currentUser!, {
  //       displayName: name,
  //       photoURL: url,
  //     })
  //       .then(() => {
  //         setState({ displayName: name, photoURL: url, email, uid });
  //       })
  //       .then(async () => await updateUserProfile(uid, name, url))
  //       .then(() => console.log("Updated profile"))
  //       .then(() =>
  //         toHome(uid, {
  //           title: "Success",
  //           status: "success",
  //           text: "Setting profile succeeded.",
  //         })
  //       );
  //   });
  // }
  const imageUpload = async (id: string, image: File) => {
    const imageRef = ref(storage, `avaters/${id}_${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const createGroup = async (data: object, image: File) => {
    setLoading(true);
    const groupRef = collection(db, "groups");
    await addDoc(groupRef, data)
      .then(async ({ id }) => {
        const membersRef = doc(db, "groups", id, "members", authUser?.uid!);
        await getUserInfo(authUser?.uid!).then(async (member) => {
          await setDoc(membersRef, member);
        });
        return id;
      })
      .then(async (id) => {
        await imageUpload(id, image).then(async (url) => {
          const roomRef = doc(db, "groups", id);
          await updateDoc(roomRef, { photoURL: url });
        });
        return id;
      })
      .then((id) => {
        const navState = {
          title: "Success",
          status: "success",
          text: "Create group succeeded.",
        } as NavigationState;
        toGroupRoom(authUser?.uid!, id, navState);
        return id;
      })
      .catch((e) => {
        const navState = {
          title: "Error",
          status: "error",
          text: "Create group failed.",
        } as NavigationState;
        toRedirect(navState);
      })
      .finally(() => {
        setLoading(true);
      });
  };
  return createGroup;
};
