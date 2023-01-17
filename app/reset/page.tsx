"use client";
import React, { memo, FormEvent, useRef } from "react";
import { usePage } from "@/hooks/usePage";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@/components/button"));
const Form = dynamic(() => import("@/components/form"));
const Input = dynamic(() => import("@/components/input"));
const MailIcon = dynamic(() => import("@/icons/mailIcon"));
const ResetIcon = dynamic(() => import("@/icons/resetIcon"));

const Reset = memo(function ResetMemo() {
  const { toLogin } = usePage();
  const { passwordReset } = usePasswordReset();
  const emailRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      const email = emailRef.current.value;
      await passwordReset(email);
    }
  };
  return (
    <>
      <Form
        title="Enter your Email address"
        secondTitle="to reset your password."
        onSubmit={onSubmit}
        startIcon={<MailIcon title />}
      >
        <Input
          label="Email"
          type="email"
          placeholder="Your Email"
          ref={emailRef}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
          startIcon={<ResetIcon />}
        >
          Reset Password
        </Button>
        <Button type="button" color="transparent" onClick={toLogin}>
          Cancel
        </Button>
      </Form>
    </>
  );
});

export default Reset;
