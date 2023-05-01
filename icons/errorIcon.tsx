import React from 'react';
import styles from '@/styles/icons/Icon.module.scss';

const Error = ({ title = false }: { title?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={[styles.icon, title ? styles.title : ''].join(' ')}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
};

export default Error;
