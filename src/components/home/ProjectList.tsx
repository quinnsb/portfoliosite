"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./ProjectList.module.css";

export default function ProjectList() {
  return (
    <section className={styles.section} id="works">
      <div className="container">
        <ScrollReveal>
          <h2 className={`${styles.heading} accent-font-italic`}>Selected projects</h2>
        </ScrollReveal>
        <ul className={styles.list}>
          {PROJECTS.map((project, index) => (
            <m.li
              key={project.slug}
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.035 }}
            >
              <Link href={`/works/${project.slug}`} className={styles.link}>
                <m.span className={styles.name} whileHover={{ x: 8 }}>
                  {project.title}
                </m.span>
                <m.span className={styles.arrow} whileHover={{ x: 8 }}>
                  &gt;
                </m.span>
              </Link>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
