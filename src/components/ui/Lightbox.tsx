"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  image: string | null;
  alt?: string;
  onClose: () => void;
}

export default function Lightbox({ image, alt = "", onClose }: LightboxProps) {
  useEffect(() => {
    if (!image) return;

    document.body.classList.add("body-lock");
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.classList.remove("body-lock");
      window.removeEventListener("keydown", handleEsc);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <m.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button className={styles.close} onClick={onClose} aria-label="Close image">
            x
          </button>
          <m.div
            className={styles.frame}
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={image} alt={alt} fill sizes="100vw" className={styles.image} />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
