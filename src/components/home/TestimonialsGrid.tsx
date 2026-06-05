"use client";

import { m } from "framer-motion";
import styles from "./TestimonialsGrid.module.css";

const testimonials = [
  {
    name: "Leo Bennett",
    title: "creative lead, form & co",
    quote:
      "They brought structure and personality to our brand in a way that immediately made everything feel more confident, polished, and cohesive.",
    color: "white",
    avatar: "/images/testimonial-icons/avatar-01.svg",
  },
  {
    name: "Nina Carter",
    title: "founder, north studio",
    quote:
      "Working together felt effortless from start to finish. They translated a rough idea into a visual identity that felt clear, expressive, and genuinely memorable.",
    color: "green",
    avatar: "/images/testimonial-icons/avatar-02.svg",
  },
  {
    name: "Ethan Brooks",
    title: "co founder, fieldwave",
    quote:
      "They have a rare ability to make complex ideas feel simple and beautiful. The final result was thoughtful, strategic, and full of character.",
    color: "blue",
    avatar: "/images/testimonial-icons/avatar-03.svg",
  },
  {
    name: "Maya Flores",
    title: "marketing manager, lune labs",
    quote:
      "The new visuals gave our launch a completely different energy. Everything felt intentional, distinctive, and much more aligned with the audience we wanted to reach.",
    color: "white",
    avatar: "/images/testimonial-icons/avatar-04.svg",
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
              whileHover={{
                y: -10,
                rotate: index % 2 === 0 ? -1.3 : 1.3,
                scale: 1.025,
              }}
              whileDrag={{
                scale: 1.06,
                rotate: index % 2 === 0 ? -3 : 3,
                zIndex: 10,
                boxShadow: "0 24px 54px rgb(0 0 0 / 0.18)",
              }}
              drag
              dragMomentum={false}
              dragElastic={0.08}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.035,
              }}
            >
              <div>
                <h3>{testimonial.name}</h3>
                <p className={styles.title}>{testimonial.title}</p>
              </div>
              <img src={testimonial.avatar} alt="" className={styles.avatar} aria-hidden="true" />
              <p className={styles.quote}>{testimonial.quote}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
