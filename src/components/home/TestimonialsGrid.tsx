"use client";

import { m } from "framer-motion";
import styles from "./TestimonialsGrid.module.css";

const testimonials = [
  {
    name: "Leo Bennett",
    title: "creative lead, brand studio",
    quote: "Quinn brings structure and personality to ideas that immediately makes everything feel clearer.",
    color: "white",
  },
  {
    name: "Nina Carter",
    title: "founder, small studio",
    quote: "Working together felt effortless from start to finish. The final direction was confident and warm.",
    color: "white",
  },
  {
    name: "Ethan Brooks",
    title: "co-founder, nonprofit",
    quote: "They took our ability to make complex ideas feel simple and beautiful. The final work felt thoughtful.",
    color: "blue",
  },
  {
    name: "Maya Flores",
    title: "marketing lead",
    quote: "The work helped us turn a complex message into something direct, memorable, and useful.",
    color: "white",
  },
  {
    name: "Sofia Grant",
    title: "brand manager",
    quote: "From the first concepts to the final files, every detail was handled with care.",
    color: "green",
  },
  {
    name: "Tom Turner",
    title: "founder, culture project",
    quote: "The result landed exactly where our team needed it: distinctive, practical, and ready to move.",
    color: "white",
  },
];

export default function TestimonialsGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>
          What <span className="accent-font-italic">nice</span> People say
        </h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <m.article
              key={testimonial.name}
              className={`${styles.card} ${styles[testimonial.color]}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <div>
                <h3>{testimonial.name}</h3>
                <p className={styles.title}>{testimonial.title}</p>
              </div>
              <span className={styles.avatar} aria-hidden="true" />
              <p className={styles.quote}>{testimonial.quote}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
