"use client";

import { m } from "framer-motion";
import { useState } from "react";
import ContactModal from "@/components/ui/ContactModal";
import { SITE, SOCIAL } from "@/lib/constants";
import styles from "./ContactCTA.module.css";

const flowers = [
  { src: "/images/mail-flower/stem-left.png", className: styles.stemLeft, delay: 0.05 },
  {
    src: "/images/mail-flower/flower-large-left-full.png",
    className: styles.flowerLargeLeft,
    delay: 0.08,
  },
  {
    src: "/images/mail-flower/blue-leaves-left.png",
    className: styles.blueLeavesLeft,
    delay: 0.14,
  },
  { src: "/images/mail-flower/stem-center.png", className: styles.stemCenter, delay: 0.18 },
  {
    src: "/images/mail-flower/flower-large-right.png",
    className: styles.flowerLargeRight,
    delay: 0.2,
  },
  { src: "/images/mail-flower/flower-red.png", className: styles.flowerRed, delay: 0.26 },
  { src: "/images/mail-flower/stem-right.png", className: styles.stemRight, delay: 0.28 },
  { src: "/images/mail-flower/berries.png", className: styles.berries, delay: 0.32 },
  {
    src: "/images/mail-flower/flower-small-red.png",
    className: styles.flowerSmallRed,
    delay: 0.36,
  },
  {
    src: "/images/mail-flower/blue-leaves-right.png",
    className: styles.blueLeavesRight,
    delay: 0.4,
  },
  { src: "/images/mail-flower/bee-1.png", className: styles.beeOne, delay: 0.42 },
  { src: "/images/mail-flower/bee-2.png", className: styles.beeTwo, delay: 0.46 },
];

export default function ContactCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Have <span className="accent-font-italic">a project</span> in mind?
            <br />
            Let&apos;s bring <span className="accent-font-italic">it to life.</span>
          </h2>
          <button className={styles.email} onClick={() => setIsOpen(true)}>
            {SITE.email}
          </button>
        </div>

        <div className={styles.garden} aria-hidden="true">
          {flowers.map((flower) => (
            <m.span
              key={flower.src}
              className={`${styles.flowerLayer} ${flower.className}`}
              initial={{ opacity: 0, y: 42, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: flower.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <img src={flower.src} alt="" className={styles.flowerAsset} />
            </m.span>
          ))}
        </div>

        <img src="/images/mail-flower/mail-front.png" alt="" className={styles.mailFront} />

        <div className={styles.footerRow}>
          <span>
            Made by <strong>Quinn Brewer</strong>
          </span>
          <span className={styles.socials}>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </span>
          <span>Copyright © 2026, Quinn Brewer</span>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
