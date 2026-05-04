"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import styles from "./SneakPeekGallery.module.css";

const galleryImages = [
  "/images/hero/quinn-chair.png",
  "/images/about/quinn-headshot.png",
  "/images/about/quinn-standing.jpg",
  "/images/hero/quinn-chair.png",
  "/images/about/quinn-headshot.png",
];

export default function SneakPeekGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const marqueeImages = [...galleryImages, ...galleryImages];

  return (
    <section className={styles.section}>
      <div className={styles.mark}>
        <span />
      </div>
      <h2 className={`${styles.heading} accent-font-italic`}>Sneak peak of my works</h2>
      <div className={styles.viewport}>
        <m.div
          className={`${styles.track} ${isDragging ? styles.paused : ""}`}
          drag="x"
          dragConstraints={{ left: -900, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {marqueeImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              className={styles.tile}
              onClick={() => setActiveImage(src)}
              aria-label="Open gallery image"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 58vw, 280px"
                className={styles.image}
              />
            </button>
          ))}
        </m.div>
      </div>
      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}
