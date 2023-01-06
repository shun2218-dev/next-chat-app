"use client";
import React, { memo, useEffect } from "react";
import logo from "public/logo.svg";
import styles from "@/styles/pages/Start.module.scss";
import { usePage } from "@/hooks/usePage";
import Button from "@/components/button";
import Image from "next/image";

const Start = memo(function StartMemo() {
  const { toLogin, toRegist } = usePage();
  const removeHomeClass = (toMove: () => void) => {
    document.body.classList.remove("home");
    document.body.classList.remove("pace-done");
    toMove();
  };

  useEffect(() => {
    const addHomeClass = () => {
      const bodyClasses = document.body.classList;
      if (!bodyClasses.contains("home")) {
        bodyClasses.remove("pace-done");
        bodyClasses.add("home");
      }
    };
    addHomeClass();
  }, []);

  return (
    <div className={styles.container}>
      <Image src={logo} alt="logo" className={styles.logo} priority />
      <div className={styles.buttonGroup}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          rounded
          onClick={() => removeHomeClass(toRegist)}
          // onClick={toRegist}
          height="50px"
          width="150px"
        >
          Get Started
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="filled"
          onClick={() => removeHomeClass(toLogin)}
          // onClick={toLogin}
          height="30px"
          width="150px"
        >
          Sign In &gt;
        </Button>
      </div>
    </div>
  );
});

export default Start;
