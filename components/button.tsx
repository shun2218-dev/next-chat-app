import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Button.module.scss";
import Link from "next/link";

type Routes = "/start" | "/login" | "/regist" | "/reset" | string;

type Props = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  children: string | ReactNode;
  onClick?: () => void;
  color: "primary" | "transparent" | "error" | "success";
  variant?: "filled" | "outlined" | "contained";
  rounded?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  header?: boolean;
  href?: Routes;
};

const Button: FC<Props> = ({
  type,
  disabled = false,
  width,
  height,
  margin,
  children,
  onClick,
  color = "transparent",
  variant = "filled",
  fullWidth = false,
  startIcon,
  endIcon,
  header = false,
  href,
}) => {
  const switchStyles = (variant: string) => {
    switch (variant) {
      case "filled":
        return styles.filled;
      case "contained":
        return styles.contained;
      case "outlined":
        return styles.outlined;
      default:
        return styles.filled;
    }
  };

  const switchBgColor = (color: string) => {
    switch (color) {
      case "primary":
        return styles.primary;
      case "transparent":
        return styles.transparent;
      case "error":
        return styles.error;
      case "success":
        return styles.success;
      default:
        return styles.transparent;
    }
  };

  const switchWidth = (fullWidth: boolean) => {
    if (fullWidth) {
      return styles.fullWidth;
    } else {
      return styles.cutomWidth;
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: `${width}`,
        height: `${height}`,
        margin: `${margin}`,
        // borderRadius: `${rounded ? "24px" : "6px"}`,
      }}
      className={`${switchStyles(variant)} ${switchBgColor(
        color
      )} ${switchWidth(fullWidth)} ${styles.button} ${
        header ? styles.header : ""
      }`}
    >
      {href ? (
        <Link href={href} className={styles.buttonLink}>
          {startIcon}
          {children}
          {endIcon}
        </Link>
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </button>
  );
};

export default Button;
