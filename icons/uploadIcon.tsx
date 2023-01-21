import React, { FC } from "react";
import styles from "@/styles/icons/Icon.module.scss";
import { Icon } from "@/types/Icon";

const UploadIcon: FC<Icon> = ({ title = false }) => {
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
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      ></path>
    </svg>
  );
};

export default UploadIcon;
