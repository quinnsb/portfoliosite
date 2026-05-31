"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: string[];
  layout?: ("full" | "grid")[];
  fit?: ("cover" | "contain")[];
  title: string;
}

export default function ImageGallery({ images, layout = [], fit = [], title }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className={styles.gallery}>
      {images.map((image, index) => {
        const mode = layout[index] ?? (index % 3 === 0 ? "full" : "grid");
        const imageFit = fit[index] ?? "cover";
        return (
          <button
            key={`${image}-${index}`}
            className={mode === "full" ? styles.full : styles.grid}
            onClick={() => setActiveImage(image)}
            aria-label={`Open ${title} image ${index + 1}`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes={mode === "full" ? "100vw" : "(max-width: 900px) 100vw, 50vw"}
              className={`${styles.image} ${imageFit === "contain" ? styles.contain : ""}`}
            />
          </button>
        );
      })}
      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}
