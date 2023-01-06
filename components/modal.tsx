import React, { FC, FormEvent, memo, ReactNode } from "react";
import styles from "@/styles/components/Modal.module.scss";
import utilStyles from "@/styles/utils/utils.module.scss";

type Props = {
  title: string;
  children?: ReactNode;
  open: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  error?: boolean;
};

const Modal: FC<Props> = memo(function ModalMemo({
  title,
  children,
  open,
  onSubmit,
  error = false,
}) {
  return (
    <>
      {open && (
        <div id="overlay" className={styles.overlay}>
          <form id="modalBody" className={styles.modalBody} onSubmit={onSubmit}>
            {error && (
              <div className={utilStyles.errorText}>
                <p>
                  Your profile is not yet set up.
                  <br />
                  Please set up your profile to start chatting!
                </p>
              </div>
            )}
            <h2 className={styles.title}>{title}</h2>
            {children}
          </form>
        </div>
      )}
    </>
  );
});

export default Modal;
