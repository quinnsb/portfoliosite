import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/layout/ContactCTA";
import WorkMockShell from "@/components/work-mock/WorkMockShell";
import styles from "../all-work/page.module.css";

export const metadata: Metadata = {
  title: "Work — Quinn Brewer",
  description:
    "Selected projects spanning brand strategy, creative production, copywriting, photography, and more.",
};

const tickerItems = [
  "Chicago / Mia Park",
  "Austin / Leo James",
  "Nashville / June Cross",
  "Denver / Theo Bell",
  "Brooklyn / Inez Ray",
  "Portland / Cam Reid",
];

export default function WorkPage() {
  const tickerLoop = [...tickerItems, ...tickerItems];

  return (
    <WorkMockShell>
      <main className={styles.page}>
        <section className={styles.projectStack} aria-label="Featured work">
          <Link href="/works/wholly-balls" className={`${styles.card} ${styles.whollyCard}`}>
            <Image
              src="/images/projects/wholly-balls/logo-light-cream-transparent.png"
              alt=""
              width={1024}
              height={473}
              className={styles.whollyLogo}
            />
            <span className={styles.projectReveal}>
              <span className={styles.revealCopy}>
                <strong>Wholly Balls</strong>
                <small>Complete rebrand and packaging design for a protein bites company.</small>
              </span>
              <span className={styles.revealArrow}>→</span>
            </span>
          </Link>

          <Link href="/works/southtown-design-build" className={`${styles.card} ${styles.southtownCard}`}>
            <div className={styles.notchedPhoto}>
              <span>Build notes / 2026</span>
            </div>
            <span className={styles.southtownName}>Southtown</span>
            <span className={styles.projectReveal}>
              <span className={styles.revealCopy}>
                <strong>Southtown Design+Build</strong>
                <small>Brand, web, and art direction for a residential design-build studio.</small>
              </span>
              <span className={styles.revealArrow}>→</span>
            </span>
          </Link>

          <div className={styles.teaserPair}>
            <Link href="/works/southtown-design-build" className={`${styles.card} ${styles.blueCard}`}>
              <span className={styles.badge}>Travel Lab</span>
              <span className={styles.postcard}>Field guide</span>
              <span className={styles.projectReveal}>
                <span className={styles.revealCopy}>
                  <strong>Bright Trip Field Guide</strong>
                  <small>Content strategy and visual storytelling for curious travelers.</small>
                </span>
                <span className={styles.revealArrow}>→</span>
              </span>
            </Link>
            <Link href="/works/southtown-design-build" className={`${styles.card} ${styles.oliveCard}`}>
              <span className={styles.ribbon}>Campaign</span>
              <span className={styles.oliveType}>Rooted</span>
              <span className={styles.projectReveal}>
                <span className={styles.revealCopy}>
                  <strong>Rooted Campaign</strong>
                  <small>A warm campaign concept built around care, rhythm, and trust.</small>
                </span>
                <span className={styles.revealArrow}>→</span>
              </span>
            </Link>
          </div>

          <section className={styles.marquee} aria-label="Collaborator ticker">
            <div className={styles.marqueeTrack}>
              {tickerLoop.map((item, index) => (
                <span className={styles.marqueeItem} key={`${item}-${index}`}>
                  {item}
                  <span className={styles.portrait} aria-hidden="true" />
                </span>
              ))}
            </div>
          </section>

          <Link href="/works/southtown-design-build" className={`${styles.card} ${styles.orangeCard}`}>
            <span className={styles.orangeLabel}>Launch week</span>
            <span className={styles.orangeType}>Daymade</span>
            <span className={styles.projectReveal}>
              <span className={styles.revealCopy}>
                <strong>Daymade Creative Agency</strong>
                <small>Launch creative, production systems, and brand campaign support.</small>
              </span>
              <span className={styles.revealArrow}>→</span>
            </span>
          </Link>

          <Link href="/works/southtown-design-build" className={`${styles.card} ${styles.creamCard}`}>
            <span className={styles.scriptMark}>Quinn</span>
            <span className={styles.stamp}>Selected stories / strategy / production</span>
            <span className={styles.projectReveal}>
              <span className={styles.revealCopy}>
                <strong>Selected Stories</strong>
                <small>Strategy, copy, and production across recent portfolio work.</small>
              </span>
              <span className={styles.revealArrow}>→</span>
            </span>
          </Link>
        </section>

        <ContactCTA />
      </main>
    </WorkMockShell>
  );
}
