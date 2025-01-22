import React from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", onClick }) => {
  return (
    <button
      className={cx(styles.button, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;