import type { ProjectTestimonial as Testimonial } from "@/types/project";
import styles from "./ProjectTestimonial.module.css";

export default function ProjectTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className={styles.testimonial}>
      <p className={styles.label}>Testimonial</p>
      <blockquote>&quot;{testimonial.quote}&quot;</blockquote>
      <figcaption>
        {testimonial.author}, {testimonial.title}
      </figcaption>
    </figure>
  );
}
