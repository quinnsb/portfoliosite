import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./AboutTeaser.module.css";

export default function AboutTeaser() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className={styles.heading}>
            <span className="accent-font-italic">The person</span>
            <br />
            behind the work
          </h2>
        </ScrollReveal>
        <div className={styles.panel}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about/quinn-headshot.png"
              alt="Quinn Brewer headshot"
              fill
              sizes="(max-width: 900px) 90vw, 440px"
              className={styles.image}
            />
          </div>
          <div className={styles.card}>
            <p className={`${styles.signature} accent-font-italic`}>Quinn Brewer</p>
            <h3>About me</h3>
            <p>
              I&apos;m a marketing leader and multimedia creative who blends strategy,
              storytelling, and production craft to help ideas move with clarity.
            </p>
            <Button href="/about" variant="outline">
              Read more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
