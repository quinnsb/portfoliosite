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
              src="/images/about/Daymade-57.jpg"
              alt="Quinn Brewer headshot"
              fill
              sizes="(max-width: 900px) 90vw, 440px"
              className={styles.image}
            />
          </div>
          <div className={styles.card}>
            <h3>About me</h3>
            <p>
              I&apos;m a curious, culture-hungry creative who likes building things that feel both
              useful and alive. When I&apos;m not shaping a campaign or production, I&apos;m probably
              digging through records, reading a giant fantasy novel, cooking something new, or
              chasing the next idea before it gets obvious.
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
