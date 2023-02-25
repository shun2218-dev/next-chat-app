import React, { FC, ReactNode } from 'react';
import styles from '@/styles/components/Card.module.scss';
import Link from 'next/link';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  startIcon?: ReactNode;
  href?: string;
  testid?: string;
};

const Card: FC<Props> = ({
  children,
  onClick,
  startIcon,
  href,
  testid = '',
}) => {
  return (
    <>
      {href ? (
        <Link href={href} data-testid={testid}>
          <div className={styles.card} onClick={onClick}>
            {startIcon}
            {children}
          </div>
        </Link>
      ) : (
        <div className={styles.card} onClick={onClick} data-testid={testid}>
          {startIcon}
          {children}
        </div>
      )}
    </>
  );
};

export default Card;
