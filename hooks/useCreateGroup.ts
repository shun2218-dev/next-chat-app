'use client';
import { getUserInfo } from '@/utils/getUserInfo';
import { NavigationState } from '@/types/NavigationState';
import { updateProfile } from 'firebase/auth';
import { addDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { usePage } from './usePage';

import { useAuthUserStore } from '@/atoms/useAuthUserStore';
import {
  GET_GROUPS,
  INSERT_AVATAR_IMAGE,
  INSERT_GROUP_MEMBER,
  UPDATE_GROUP_INFO,
} from 'queries/query';

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
    const imageRef = INSERT_AVATAR_IMAGE(id, image.name);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const createGroup = async (data: object, image: File) => {
    setLoading(true);

    await addDoc(GET_GROUPS(), data)
      .then(async ({ id }) => {
        await getUserInfo(authUser?.uid!).then(async (member) => {
          await setDoc(INSERT_GROUP_MEMBER(id, authUser?.uid!), member);
        });
        return id;
      })
      .then(async (id) => {
        await imageUpload(id, image).then(async (url) => {
          await updateDoc(UPDATE_GROUP_INFO(id), { photoURL: url });
        });
        return id;
      })
      .then((id) => {
        const navState = {
          title: 'Success',
          status: 'success',
          text: 'Create group succeeded.',
        } as NavigationState;
        toGroupRoom(authUser?.uid!, id, navState);
        return id;
      })
      .catch((e) => {
        const navState = {
          title: 'Error',
          status: 'error',
          text: 'Create group failed.',
        } as NavigationState;
        toRedirect(navState);
      })
      .finally(() => {
        setLoading(true);
      });
  };
  return createGroup;
};
