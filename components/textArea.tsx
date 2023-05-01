import React, { ChangeEvent, FC, memo } from 'react';
import styles from '@/styles/components/TextArea.module.scss';

type Props = {
  label: string;
  value: string;
  rows?: number;
  cols?: number;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaMemo: FC<Props> = ({
  label,
  rows = 6,
  cols = 60,
  placeholder,
  required,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <label className={styles.input}>
      {label}
      <textarea
        rows={rows}
        cols={cols}
        value={value}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </label>
  );
};

export const TextArea = memo(TextAreaMemo);
