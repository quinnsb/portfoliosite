"use client";

import { m } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./ServicesSection.module.css";

const SERVICE_DETAILS: Record<string, string[]> = {
  "Marketing Strategy": ["Campaign planning", "Positioning", "Content roadmaps"],
  "Podcast Production": ["Show development", "Recording support", "Editing + publishing"],
  "Brand Design": ["Visual identity", "Typography", "Brand systems"],
  "Video Production": ["Creative direction", "Production", "Post-production"],
};

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
                className={styles.item}
                tabIndex={0}
              >
                <span className={styles.serviceMain}>
                  <img
                    src="/images/icons/fountain-pen.svg"
                    alt=""
                    aria-hidden="true"
                    className={styles.penIcon}
                  />
                  <span className={styles.serviceName}>{service}</span>
                  <span className={styles.includes} aria-label={`${service} includes`}>
                    {SERVICE_DETAILS[service].map((detail) => (
                      <span key={detail}>/ {detail}</span>
                    ))}
                  </span>
                </span>
              </m.li>
            ))}
          </ul>
          <div className={styles.badgeWrap} aria-hidden="true">
            <img
              src="/images/icons/asset-4.svg"
              alt=""
              className={`${styles.badge} ${styles.badgeDefault}`}
            />
            <img
              src="/images/icons/asset-17.png"
              alt=""
              className={`${styles.badge} ${styles.badgeHover}`}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
