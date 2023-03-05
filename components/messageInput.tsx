import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
  ChangeEvent,
} from 'react';

import SendIcon from '@/icons/sendIcon';

import styles from '@/styles/components/MessageInput.module.scss';
import PhotoIcon from '@/icons/photoIcon';

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setState: Dispatch<SetStateAction<string>>;
  setImageState?: Dispatch<SetStateAction<File | null>>;
  state: string;
  imageState: File | null;
  loading: boolean;
  testid?: string;
};

const MessageInput: FC<Props> = ({
  onSubmit,
  setState,
  setImageState,
  state,
  imageState,
  loading,
  testid = '',
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setImageState) {
      if (e.target.files !== null) {
        setUrl('');
        setImageState(e.target.files[0]);
      }
    }
  };
  return (
    <form className={styles.container} onSubmit={onSubmit} data-testid={testid}>
      <input
        type="text"
        className={styles.input}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <div className={styles.iconContainer}>
        <label htmlFor="photo">
          <PhotoIcon filled={!!imageState} />
        </label>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="photo"
          onChange={handleChange}
        />
      </div>
      {(state || imageState) && !loading && (
        <button className={styles.button} disabled={loading} type="submit">
          <SendIcon />
        </button>
      )}
    </form>
  );
};

export default MessageInput;
