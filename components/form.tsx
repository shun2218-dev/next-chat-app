import React, { FC, FormEvent, ReactNode, memo } from 'react';
import styles from '@/styles/components/Form.module.scss';

type Props = {
  children: ReactNode;
  title: string;
  secondTitle?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  startIcon?: ReactNode;
  testid?: string;
};

const FormMemo: FC<Props> = ({
  children,
  title,
  secondTitle,
  onSubmit,
  startIcon,
  testid = '',
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit} data-testid={testid}>
      <h2 className={styles.title}>
        {startIcon}
        {title}
        {secondTitle && (
          <>
            <br />
            {secondTitle}
          </>
        )}
      </h2>
      {children}
    </form>
  );
};

export const Form = memo(FormMemo);
