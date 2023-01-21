import React, { FC } from "react";
import styles from "@/styles/icons/Icon.module.scss";
import { Icon } from "@/types/Icon";

const LockIcon: FC<Icon> = ({ title = false }) => {
  return (
    <svg
      className={`${styles.icon} ${title ? styles.title : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
      ></path>
    </svg>
  );
};

export default LockIcon;
