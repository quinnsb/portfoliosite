"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState, FormEvent, useEffect } from "react";
import { FORMSPREE_ID } from "@/lib/constants";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        if (status === "success") {
          setName("");
          setEmail("");
          setMessage("");
          setStatus("idle");
        }
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen, status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-modal="true"
          role="dialog"
        >
          <m.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button onClick={onClose} className={styles.close} aria-label="Close form">
              ×
            </button>
            <h2 className={styles.title}>
              Have <span className="accent-font-italic">a project</span> in mind?
            </h2>
            <p className={styles.subtitle}>
              Tell me a bit about it and I&apos;ll get back to you within 48 hours.
            </p>

            {status === "success" ? (
              <div className={styles.success}>
                <p className={styles.successHeading}>Thanks! Your message is on its way.</p>
                <p>I&apos;ll respond as soon as I can.</p>
                <button type="button" onClick={onClose} className={styles.button}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.input}
                    disabled={status === "submitting"}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    disabled={status === "submitting"}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Message</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className={styles.textarea}
                    disabled={status === "submitting"}
                  />
                </label>

                {status === "error" && (
                  <p className={styles.error}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.button}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
