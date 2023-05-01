import React, { RefObject, forwardRef } from 'react';
import { caveat, yujiMai } from 'fonts/googleFonts';

import styles from '@/styles/components/Input.module.scss';

type Props = {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  label?: string;
  required?: boolean;
  ref?: RefObject<HTMLInputElement>;
  defaultValue?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(function InputForwardRef(
  { type = 'text', placeholder, label, required = true, defaultValue },
  ref
) {
  return (
    <label
      className={[styles.input, caveat.variable, yujiMai.variable].join(' ')}
    >
      {label}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        defaultValue={defaultValue}
      />
    </label>
  );
});

export { Input };
