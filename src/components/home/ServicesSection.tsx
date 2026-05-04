"use client";

import { m } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.card}>
          <p className={`${styles.kicker} accent-font-italic`}>Services</p>
          <ul className={styles.list}>
            {SERVICES.map((service, index) => (
              <m.li
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                {service}
              </m.li>
            ))}
          </ul>
          <span className={styles.badge} aria-hidden="true">
            *
          </span>
        </ScrollReveal>
      </div>
    </section>
  );
}
