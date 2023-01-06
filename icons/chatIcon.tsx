import React, { FC } from "react";
import styles from "@/styles/icons/Icon.module.scss";
import { Icon } from "@/types/Icon";

const ChatIcon: FC<Icon> = ({ title = false }) => {
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
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      ></path>
    </svg>
  );
};

export default ChatIcon;
