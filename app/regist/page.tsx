'use client';
import React, { FormEvent, useEffect, useRef } from 'react';
import { usePage } from '@/hooks/usePage';
import { useSignUp } from '@/hooks/useSignUp';

import Button from '@/components/button';
import { Form } from '@/components/form';
import { Input } from '@/components/input';
import SignUpIcon from '@/icons/signUpIcon';
import SignInIcon from '@/icons/signInIcon';
import CheckInIcon from '@/icons/checkInIcon';
import { PageParam } from '@/types/PageParam';

import styles from '@/styles/pages/Regist.module.scss';

type Props = {
  params: PageParam;
};

export const dynamic = 'error';
export const dynamicParams = true;
export const revalidate = 1;

const Regist = ({ params }: Props) => {
  const { toUser } = usePage();
  const { signUp, loading, error } = useSignUp();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  if (error) throw new Error(error.message);

  const passwordValidate = (password: string, passwordConfirmation: string) => {
    if (password === passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;
    if (email && password && passwordConfirmation) {
      if (passwordValidate(password, passwordConfirmation)) {
        signUp(email, password);
      }
    }
  };

  useEffect(() => {
    const id = params?.uid;
    if (id) {
      toUser(id);
    }
  }, [params?.uid, toUser]);

  return (
    <>
      <Form
        title="Sign Up"
        onSubmit={onSubmit}
        startIcon={<SignUpIcon title />}
        testid="regist-form"
      >
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          required
          ref={emailRef}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
        <Input
          label="Password Confirmation"
          type="password"
          placeholder="Password Confirmation"
          required
          ref={passwordConfirmationRef}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="20px 0 0"
          startIcon={<CheckInIcon />}
          disabled={loading}
        >
          Sign Up
        </Button>
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            color="transparent"
            startIcon={<SignInIcon />}
            href="/login"
          >
            Sign In
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Regist;
