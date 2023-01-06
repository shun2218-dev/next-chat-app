import React, { FC } from "react";
import styles from "@/styles/icons/Icon.module.scss";
import { Icon } from "@/types/Icon";

const NotFoundIcon: FC<Icon> = ({ title = false }) => {
  return (
    <svg
      className={`${styles.icon} ${title && styles.title}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default NotFoundIcon;
