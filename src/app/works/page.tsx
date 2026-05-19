import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/layout/ContactCTA";
import { PROJECTS } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work — Quinn Brewer",
  description:
    "Selected projects spanning brand strategy, creative production, copywriting, photography, and more.",
};

const projectPreviewImages: Record<string, string> = {
  "the-forgotten-initiative": "/images/gallery/photo-01.webp",
  "bright-trip": "/images/gallery/photo-02.webp",
  "collegiate-church-network": "/images/gallery/photo-03.webp",
  copywriting: "/images/gallery/photo-04.webp",
  "daymade-creative-agency": "/images/gallery/photo-05.webp",
  photography: "/images/gallery/photo-06.webp",
  "podcast-production": "/images/gallery/photo-07.webp",
  "brand-strategy": "/images/gallery/photo-08.webp",
};

const projectRoles: Record<string, string> = {
  "the-forgotten-initiative": "Communications Director",
  "bright-trip": "Marketing Strategy",
  "collegiate-church-network": "Brand & Content Strategy",
  copywriting: "Copywriter",
  "daymade-creative-agency": "Creative Producer",
  photography: "Photographer",
  "podcast-production": "Podcast Producer",
  "brand-strategy": "Brand Strategist",
};

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={`${styles.heading} accent-font-italic`}>Work</h1>
          <p className={styles.subtitle}>
            A selection of projects across brand, content, production, and creative strategy.
          </p>
        </div>
      </section>
      <div className="container">
        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/works/${project.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={projectPreviewImages[project.slug]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 640px"
                  className={styles.image}
                />
              </div>
              <div className={styles.overlay}>
                <span className={styles.cardTitle}>{project.title}</span>
                <span className={styles.cardRole}>
                  {projectRoles[project.slug]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ContactCTA />
    </main>
  );
}
