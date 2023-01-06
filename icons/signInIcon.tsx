import React, { FC } from "react";
import styles from "@/styles/icons/Icon.module.scss";
import { Icon } from "@/types/Icon";

const SignInIcon: FC<Icon> = ({ title = false }) => {
  return (
    <svg
      className={`${styles.icon} ${title && styles.title}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      ></path>
    </svg>
  );
};

export default SignInIcon;
