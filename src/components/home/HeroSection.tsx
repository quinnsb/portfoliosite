"use client";

import { m } from "framer-motion";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const heroEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const lineVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: heroEase },
  },
};

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <m.div
          className={styles.copy}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.22,
              },
            },
          }}
        >
          <m.div className={styles.greeting} variants={lineVariants}>
            <img
              src="/images/icons/hi-there-icon.svg"
              alt=""
              aria-hidden="true"
              className={styles.greetingIcon}
            />
            <span className="accent-font-italic">Hi there!</span>
          </m.div>
          <h1 className={styles.title}>
            <m.span className={styles.line} variants={lineVariants}>
              I&apos;m Quinn,
            </m.span>
            <m.span className={styles.line} variants={lineVariants}>
              <span className={`${styles.emphasis} accent-font-italic`}>
                Marketing Leader
                <span className={styles.underlineReveal} aria-hidden="true">
                  <img
                    src="/images/elements/hero-underline.svg"
                    alt=""
                    className={styles.underlineImage}
                  />
                </span>
              </span>
            </m.span>
            <m.span className={`${styles.line} ${styles.afterLeaderLine}`} variants={lineVariants}>
              and Multimedia Creative.
            </m.span>
          </h1>
        </m.div>
        <m.div
          className={styles.imageHover}
          initial={{ opacity: 0, y: 38, scale: 0.96, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src="/images/icons/asset-7.svg"
            alt=""
            aria-hidden="true"
            className={styles.peekIcon}
          />
          <div className={styles.imageWrap}>
            <Image
              src="/images/hero/quinn-hero.jpg"
              alt="Quinn Brewer portrait"
              fill
              sizes="(max-width: 1024px) 80vw, 42vw"
              priority
              className={styles.image}
            />
          </div>
        </m.div>
      </div>
    </section>
  );
}
