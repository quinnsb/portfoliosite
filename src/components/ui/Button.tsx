"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classNames = `${styles.button} ${styles[variant]} ${className ?? ""}`;

  if (href) {
    return (
      <m.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={styles.wrap}>
        <Link href={href} className={classNames}>
          {children}
        </Link>
      </m.span>
    );
  }

  return (
    <m.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={styles.wrap}>
      <button className={classNames} {...props}>
        {children}
      </button>
    </m.span>
  );
}
