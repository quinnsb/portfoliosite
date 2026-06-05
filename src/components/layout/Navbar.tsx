"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavOverlay from "./NavOverlay";
import ContactModal from "../ui/ContactModal";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasSolidBackground, setHasSolidBackground] = useState(false);
  const usesDarkNav =
    pathname.startsWith("/all-work") ||
    pathname === "/works" ||
    pathname === "/works/southtown-design-build";

  useEffect(() => {
    if (isOpen || isContactOpen) {
      document.body.classList.add("body-lock");
    } else {
      document.body.classList.remove("body-lock");
    }
    return () => document.body.classList.remove("body-lock");
  }, [isOpen, isContactOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (isOpen || currentScrollY < 40) {
        setIsHidden(false);
        setHasSolidBackground(false);
      } else if (Math.abs(currentScrollY - lastScrollY) > 6) {
        setIsHidden(scrollingDown);
        setHasSolidBackground(!scrollingDown);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <header
        className={`${styles.navbar} ${isHidden ? styles.hidden : ""} ${
          isOpen ? styles.open : ""
        } ${hasSolidBackground ? styles.solid : ""} ${usesDarkNav ? styles.darkSurface : ""}`}
      >
        <div className={styles.inner}>
          <Link href="/" className={`${styles.logo} accent-font`}>
            Quinn Brewer
          </Link>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className={styles.menuButton}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </header>

      <NavOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
