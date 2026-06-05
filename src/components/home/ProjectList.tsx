"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import styles from "./ProjectList.module.css";

const projectPreviewImages: Record<string, string> = {
  "the-forgotten-initiative": "/images/projects/the-forgotten-initiative/booklet-cover.webp",
  "bright-trip": "/images/gallery/photo-02.webp",
  "collegiate-church-network": "/images/gallery/photo-03.webp",
  copywriting: "/images/gallery/photo-04.webp",
  "daymade-creative-agency": "/images/gallery/photo-05.webp",
  photography: "/images/gallery/photo-06.webp",
  "podcast-production": "/images/gallery/photo-07.webp",
  "brand-strategy": "/images/gallery/photo-08.webp",
};

export default function ProjectList() {
  const projectColumns = [PROJECTS.slice(0, 4), PROJECTS.slice(4)];

  return (
    <section className={styles.section} id="works">
      <div className="container">
        <ScrollReveal className={styles.headingWrap}>
          <h2 className={`${styles.heading} accent-font-italic`}>Selected projects</h2>
          <img
            className={styles.underline}
            src="/images/elements/scribbles/asset-16.svg"
            alt=""
            aria-hidden="true"
          />
        </ScrollReveal>
      </div>
      <div className={styles.projectMenu}>
        <div className={styles.columns}>
          {projectColumns.map((column, columnIndex) => (
            <ul className={styles.list} key={columnIndex}>
              {column.map((project, index) => {
                const itemIndex = columnIndex === 0 ? index : index + 4;

                return (
                  <m.li
                    key={project.slug}
                    className={styles.item}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35, delay: itemIndex * 0.035 }}
                  >
                    <Link href={`/works/${project.slug}`} className={styles.link}>
                      <span className={styles.name}>{project.title}</span>
                      <span className={styles.arrow} aria-hidden="true">
                        &gt;
                      </span>
                      <span className={styles.arrowBubble} aria-hidden="true">
                        &gt;
                      </span>
                      <span className={styles.preview} aria-hidden="true">
                        <Image
                          src={projectPreviewImages[project.slug]}
                          alt=""
                          fill
                          sizes="(max-width: 720px) 36vw, 220px"
                          className={styles.previewImage}
                        />
                      </span>
                    </Link>
                  </m.li>
                );
              })}
            </ul>
          ))}
        </div>
        <ScrollReveal className={styles.ctaWrap} delay={0.12}>
          <Button href="/works" variant="outline">
            View all work
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
