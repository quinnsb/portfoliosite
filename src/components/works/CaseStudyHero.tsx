import Image from "next/image";
import styles from "./CaseStudyHero.module.css";

interface CaseStudyHeroProps {
  image: string;
  title: string;
}

export default function CaseStudyHero({ image, title }: CaseStudyHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.imageWrap}>
          <Image
            src={image}
            alt={`${title} project image`}
            fill
            sizes="100vw"
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
