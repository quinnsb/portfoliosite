import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            <span className={styles.line}>I&apos;m Quinn,</span>
            <span className={`${styles.line} accent-font-italic`}>
              Creative Marketing
            </span>
            <span className={styles.line}>
              <span className="accent-font-italic">Leader</span> and
            </span>
            <span className={styles.line}>multi-media wizard</span>
            <span className={styles.line}>
              with <span className="accent-font-italic">10 years</span> of
            </span>
            <span className={styles.line}>experience.</span>
          </h1>
        </div>
        <div className={styles.imageHover}>
          <img
            src="/images/icons/asset-7.svg"
            alt=""
            aria-hidden="true"
            className={styles.peekIcon}
          />
          <div className={styles.imageWrap}>
            <Image
              src="/images/hero/quinn-chair.png"
              alt="Quinn Brewer sitting in a chair"
              fill
              sizes="(max-width: 1024px) 80vw, 42vw"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
