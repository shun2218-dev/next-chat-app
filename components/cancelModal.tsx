import React, { FC, memo, useEffect, useState } from 'react';
import { deleteDoc, DocumentData } from 'firebase/firestore';
import { getUserInfo } from '@/utils/getUserInfo';
import { informationMessage } from '@/utils/infomationMessage';
import { CustomModal } from '@/types/CustomModal';

import Button from './button';
import { Modal } from './modal';
import { Avatar } from './avatar';

import styles from '@/styles/components/Modal.module.scss';
import { DELETE_INVITATION_USER } from 'queries/query';

const CancelModal: FC<CustomModal> = memo(function CancelModalMemo({
  params,
  open,
  modalToggle,
  cancelId,
  setCancelId,
}) {
  const { uid, groupid } = params;
  const [user, setUser] = useState<DocumentData>();
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    if (setCancelId) {
      modalToggle('cancel');
      setCancelId('');
      setLoading(false);
      setUser(undefined);
    }
  };

  const onSubmit = async () => {
    if (cancelId && setCancelId) {
      setLoading(true);
      await deleteDoc(DELETE_INVITATION_USER(groupid!, cancelId))
        .then(onClose)
        .then(
          async () =>
            await informationMessage(uid!, groupid!, 'canceled', cancelId)
        );
    }
  };

  useEffect(() => {
    if (cancelId) {
      getUserInfo(cancelId).then((userInfo) => {
        setUser(userInfo);
      });
    }
  }, [cancelId]);

  return (
    <Modal title="Cancel this invitation?" open={open}>
      {user && (
        <div>
          <Avatar size={40} storageRef={user.photoURL} chat />
          <p className={styles.text}>{user.displayName}</p>
        </div>
      )}
      <div className={[styles.modalButton, styles.row].join(' ')}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={onSubmit}
          disabled={loading}
        >
          Yes
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="outlined"
          onClick={onClose}
          disabled={loading}
        >
          No
        </Button>
      </div>
    </Modal>
  );
});

export default CancelModal;
