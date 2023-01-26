import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Card.module.scss";
import Link from "next/link";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  startIcon?: ReactNode;
  href?: string;
};

const Card: FC<Props> = ({ children, onClick, startIcon, href }) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <div className={styles.card} onClick={onClick}>
            {startIcon}
            {children}
          </div>
        </Link>
      ) : (
        <div className={styles.card} onClick={onClick}>
          {startIcon}
          {children}
        </div>
      )}
    </>
  );
};

export default Card;
