import { db, storage } from '@/firebase';
import {
  CollectionReference,
  DocumentData,
  Query,
  QueryConstraint,
  collection,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref } from 'firebase/storage';

const GET_USERS = () => {
  return collection(db, 'users');
};

const GET_USER_BY_ID = (id: string) => {
  return doc(db, 'users', id);
};

const GET_GROUPS = () => {
  return collection(db, 'groups');
};
const GET_GROUP_INFO_BY_ID = (groupid: string) => {
  return doc(db, 'groups', groupid);
};

const GET_PRIVATE_ROOMS = (userid: string) => {
  return collection(db, 'users', userid, 'rooms');
};

const GET_PRIVATE_ROOM_BY_ID = (userid: string, roomid: string) => {
  return doc(db, 'users', userid, 'rooms', roomid);
};

const GET_GROUP_MEMBERS = (groupid: string) => {
  return collection(db, 'groups', groupid, 'members');
};

const GET_GROUP_MEMBER_BY_ID = (groupid: string, userid: string) => {
  return doc(db, 'groups', groupid, 'members', userid);
};

const GET_GROUP_INVITATION_USERS = (groupid: string) => {
  return collection(db, 'groups', groupid, 'invitations');
};

const GET_PRIVATE_MESSAGES = (
  roomid: string,
  options?: QueryConstraint[]
): CollectionReference<DocumentData> | Query<DocumentData> => {
  const ref = collection(db, 'rooms', roomid, 'messages');
  const q = options ? query(ref, ...options) : ref;
  return q;
};

const GET_GROUP_MESSAGES = (groupid: string, options?: QueryConstraint[]) => {
  const ref = collection(db, 'groups', groupid, 'messages');
  const q = options ? query(ref, ...options) : ref;
  return q;
};

const INSERT_INVITATION_USERS = (groupid: string, inviteid: string) => {
  return doc(db, 'groups', groupid!, 'invitations', inviteid);
};

const DELETE_GROUP_USER = (groupid: string, userid: string) => {
  return doc(db, 'groups', groupid, 'members', userid);
};

const DELETE_INVITATION_USER = (groupid: string, cancelid: string) => {
  return doc(db, 'groups', groupid, 'invitations', cancelid);
};

const INSERT_PRIVATE_MESSAGE = (roomid: string) => {
  return collection(db, 'rooms', roomid, 'messages');
};

const INSERT_GROUP_MESSAGE = (groupid: string) => {
  return collection(db, 'groups', groupid, 'messages');
};

const INSERT_AVATAR_IMAGE = (userid: string, image_name: string) => {
  return ref(storage, `avaters/${userid}_${image_name}`);
};

const INSERT_GROUP_MEMBER = (groupid: string, userid: string) => {
  return doc(db, 'groups', groupid, 'members', userid);
};

const INSERT_CHAT_IMAGE = (
  isGroup: boolean,
  roomid: string,
  messageid: string,
  image_name: string
) => {
  const imagePath = isGroup
    ? `chatImages/group/${roomid}/${messageid}_${image_name}`
    : `chatImages/private/${roomid}/${messageid}_${image_name}`;
  return ref(storage, imagePath);
};

const UPDATE_GROUP_INFO = (groupid: string) => {
  return doc(db, 'groups', groupid);
};

const UPDATE_CHAT_DATA = (
  isGroup: boolean,
  roomid: string,
  messageid: string
) => {
  const docPath = isGroup ? 'groups' : 'rooms';
  return doc(db, docPath, roomid, 'messages', messageid);
};
export {
  GET_USERS,
  GET_USER_BY_ID,
  GET_GROUPS,
  GET_GROUP_INFO_BY_ID,
  GET_PRIVATE_ROOMS,
  GET_PRIVATE_ROOM_BY_ID,
  GET_GROUP_MEMBERS,
  GET_GROUP_MEMBER_BY_ID,
  GET_GROUP_INVITATION_USERS,
  GET_PRIVATE_MESSAGES,
  GET_GROUP_MESSAGES,
  INSERT_INVITATION_USERS,
  DELETE_GROUP_USER,
  DELETE_INVITATION_USER,
  INSERT_PRIVATE_MESSAGE,
  INSERT_GROUP_MESSAGE,
  INSERT_AVATAR_IMAGE,
  INSERT_GROUP_MEMBER,
  INSERT_CHAT_IMAGE,
  UPDATE_GROUP_INFO,
  UPDATE_CHAT_DATA,
};
