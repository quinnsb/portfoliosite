"use client";

import { m, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import styles from "./SneakPeekGallery.module.css";

const galleryImages = [
  "/images/gallery/photo-01.webp",
  "/images/gallery/photo-02.webp",
  "/images/gallery/photo-03.webp",
  "/images/gallery/photo-04.webp",
  "/images/gallery/photo-05.webp",
  "/images/gallery/photo-06.webp",
  "/images/gallery/photo-07.webp",
  "/images/gallery/photo-08.webp",
  "/images/gallery/photo-09.webp",
  "/images/gallery/photo-10.webp",
];

const NORMAL_SPEED = 55; // px/sec, positive = leftward scroll
const HOVER_SPEED = 18;
const SPEED_LERP = 0.035; // smaller = slower decay (more momentum feel)
const MAX_FLING_SPEED = 2400;

export default function SneakPeekGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ready, setReady] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackWidthRef = useRef(0);
  const speedRef = useRef(NORMAL_SPEED);
  const x = useMotionValue(0);

  const marqueeImages = [...galleryImages, ...galleryImages];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      trackWidthRef.current = el.scrollWidth / 2;
      if (trackWidthRef.current > 0) setReady(true);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", measure));
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (!ready || isDragging) return;
    const target = isHovering ? HOVER_SPEED : NORMAL_SPEED;
    speedRef.current += (target - speedRef.current) * SPEED_LERP;

    const tw = trackWidthRef.current;
    if (!tw) return;

    let newX = x.get() - (speedRef.current * delta) / 1000;
    while (newX <= -tw) newX += tw;
    while (newX > 0) newX -= tw;
    x.set(newX);
  });

  return (
    <section className={styles.section}>
      <div className={styles.mark}>
        <img src="/images/icons/asset-9.svg" alt="" aria-hidden="true" />
      </div>
      <h2 className={`${styles.heading} accent-font-italic`}>Sneak peak of my works</h2>
      <div
        className={styles.viewport}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <m.div
          ref={trackRef}
          className={styles.track}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragConstraints={{ left: -100000, right: 100000 }}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);

            // Convert drag velocity into marquee speed.
            // info.velocity.x: positive when dragging right, negative when dragging left.
            // Our speed model: positive speed = scroll left. So invert the sign.
            const flung = -info.velocity.x;
            const clamped = Math.max(
              -MAX_FLING_SPEED,
              Math.min(MAX_FLING_SPEED, flung)
            );
            speedRef.current = clamped;

            // Normalize x back into [-tw, 0)
            const tw = trackWidthRef.current;
            if (tw) {
              let cur = x.get() % tw;
              if (cur > 0) cur -= tw;
              x.set(cur);
            }
          }}
        >
          {marqueeImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              className={styles.tile}
              onClick={() => setActiveImage(src)}
              aria-label="Open gallery image"
            >
              <img src={src} alt="" className={styles.image} draggable={false} />
            </button>
          ))}
        </m.div>
      </div>
      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}
