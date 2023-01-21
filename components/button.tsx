import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Button.module.scss";

type Props = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  children: string;
  onClick?: () => void;
  color: "primary" | "transparent" | "error" | "success";
  variant?: "filled" | "outlined" | "contained";
  rounded?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  header?: boolean;
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
  rounded = false,
  fullWidth = false,
  startIcon,
  endIcon,
  header = false,
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
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;
