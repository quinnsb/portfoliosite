"use client";

import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE, SOCIAL } from "@/lib/constants";
import styles from "./NavOverlay.module.css";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

const navLinks = [
  { label: "Works", href: "/#works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

export default function NavOverlay({ isOpen, onClose, onContactClick }: NavOverlayProps) {
  const handleLinkClick = (href: string) => {
    if (href === "#contact") {
      onClose();
      setTimeout(() => onContactClick(), 200);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={styles.overlay}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-modal="true"
          role="dialog"
        >
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <m.li key={link.label} variants={itemVariants} className={styles.navItem}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className={`${styles.navLink} accent-font`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={`${styles.navLink} accent-font`}
                    >
                      {link.label}
                    </Link>
                  )}
                </m.li>
              ))}
            </ul>
          </nav>

          <m.div className={styles.follow} variants={itemVariants}>
            <span className={styles.label}>Follow</span>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sideLink}
            >
              Instagram
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sideLink}
            >
              LinkedIn
            </a>
          </m.div>

          <m.div className={styles.contact} variants={itemVariants}>
            <span className={styles.label}>Contact</span>
            <a href={`mailto:${SITE.email}`} className={styles.sideLink}>
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className={styles.sideLink}>
              {SITE.phone}
            </a>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
