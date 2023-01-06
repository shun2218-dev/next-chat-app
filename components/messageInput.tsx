import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";
import styles from "@/styles/components/MessageInput.module.scss";

import SendIcon from "@/icons/sendIcon";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setState: Dispatch<SetStateAction<string>>;
  state: string;
  loading: boolean;
};

const MessageInput: FC<Props> = ({ onSubmit, setState, state, loading }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.input}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {state && !loading && (
        <button className={styles.button} disabled={loading} type="submit">
          <SendIcon />
        </button>
      )}
    </form>
  );
};

export default MessageInput;
