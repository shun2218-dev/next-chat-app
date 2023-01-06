import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { PageParam } from "./PageParam";

export type CustomModal = {
  params: PageParam;
  open: boolean;
  modalToggle: (target: string) => void;
  inviteUsers?: QueryDocumentSnapshot<DocumentData>[];
  inviteIds?: string[];
  setInviteIds?: Dispatch<SetStateAction<string[]>>;
  cancelId?: string;
  setCancelId?: Dispatch<SetStateAction<string>>;
};
