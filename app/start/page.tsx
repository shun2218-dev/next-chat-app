'use client';
import React, { memo, useEffect } from 'react';
import logo from 'public/logo.svg';
import reactLogo from 'public/logo_react.svg';
import styles from '@/styles/pages/Start.module.scss';
import { usePage } from '@/hooks/usePage';
import Button from '@/components/button';
import Image from 'next/image';
import { analytics } from '@/firebase';
import Link from 'next/link';
import ArrowTopRight from '@/icons/arrowTopRight';

const Start = memo(function StartMemo() {
  const { toLogin, toRegist } = usePage();
  const removeHomeClass = () => {
    document.body.classList.remove('home');
    document.body.classList.remove('pace-done');
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="logo" className={styles.logo} priority />
      <div className={styles.buttonGroup}>
        <Button
          testid="regist-start"
          type="button"
          color="primary"
          variant="contained"
          rounded
          onClick={() => {
            removeHomeClass();
          }}
          height="50px"
          width="150px"
          href="/regist"
        >
          Get Started
        </Button>
        <Button
          testid="signin-start"
          type="button"
          color="transparent"
          variant="filled"
          onClick={() => {
            removeHomeClass();
          }}
          height="30px"
          width="150px"
          href="/login"
        >
          Sign In &gt;
        </Button>
      </div>
      <Button
        type="button"
        color="transparent"
        variant="filled"
        height="60px"
        width="250px"
        endIcon={<ArrowTopRight />}
      >
        <Link
          href={'https://chat-app-4a684.web.app/'}
          target="_blank"
          rel="noopner"
        >
          <Image
            src={reactLogo}
            alt="React Chat App"
            className={styles.reactLogo}
            priority
          />
        </Link>
      </Button>
    </div>
  );
});

export default Start;
