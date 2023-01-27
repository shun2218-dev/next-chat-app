import React, { FC, memo, useCallback, useState } from "react";
import { usePage } from "hooks/usePage";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { NavigationState } from "@/types/NavigationState";
import { CustomModal } from "@/types/CustomModal";
import { informationMessage } from "@/utils/infomationMessage";

import Button from "./button";
import Modal from "./modal";

import styles from "@/styles/components/Modal.module.scss";

const ExitModal: FC<CustomModal> = memo(function ExitModalMemo({
  params,
  open,
  modalToggle,
}) {
  const { uid, groupid } = params;
  const { toHome } = usePage();
  const [loading, setLoading] = useState(false);

  const exitGroup = useCallback(
    async (groupid: string, uid: string) => {
      setLoading(true);
      const flashMessage = {
        title: "Success",
        status: "success",
        text: "Exit group.",
      } as NavigationState;
      await deleteDoc(doc(db, "groups", groupid, "members", uid))
        .then(() => toHome(uid!, flashMessage))
        .then(async () => {
          await informationMessage(uid, groupid, "existed").then(() =>
            setLoading(false)
          );
        })
        .finally(() => setLoading(false));
    },
    [toHome]
  );

  return (
    <Modal title="Exit this group?" open={open}>
      <div className={`${styles.modalButton} ${styles.row}`}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={() => exitGroup(groupid!, uid!)}
          fullWidth
          disabled={loading}
        >
          Yes
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="outlined"
          onClick={() => modalToggle("exit")}
          fullWidth
          disabled={loading}
        >
          No
        </Button>
      </div>
    </Modal>
  );
});

export default ExitModal;
