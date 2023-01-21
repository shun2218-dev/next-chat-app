"use client";
import React, { memo, useEffect } from "react";
import logo from "public/logo.svg";
import reactLogo from "public/logo_react.svg";
import styles from "@/styles/pages/Start.module.scss";
import { usePage } from "@/hooks/usePage";
import Button from "@/components/button";
import Image from "next/image";
import { analytics } from "@/firebase";
import Link from "next/link";
import ArrowTopRight from "@/icons/arrowTopRight";

const Start = memo(function StartMemo() {
  const { toLogin, toRegist } = usePage();
  const removeHomeClass = (toMove: () => void) => {
    document.body.classList.remove("home");
    document.body.classList.remove("pace-done");
    toMove();
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="logo" className={styles.logo} priority />
      <div className={styles.buttonGroup}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          rounded
          onClick={() => {
            removeHomeClass(toRegist);
          }}
          height="50px"
          width="150px"
        >
          Get Started
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="filled"
          onClick={() => {
            removeHomeClass(toLogin);
          }}
          height="30px"
          width="150px"
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
          href={"https://chat-app-4a684.web.app/"}
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
