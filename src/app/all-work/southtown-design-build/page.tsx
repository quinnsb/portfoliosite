import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/layout/ContactCTA";
import WorkMockShell from "@/components/work-mock/WorkMockShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Southtown Design+Build Mock — Quinn Brewer",
  description: "An example editorial project landing page concept.",
  robots: {
    index: false,
    follow: false,
  },
};

const tags = ["Strategy", "Brand Identity", "Web Design", "Copy Direction", "Art Direction"];

export default function SouthtownMockPage() {
  return (
    <WorkMockShell>
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="project-title">
          <Link href="/works" className={styles.backLink}>
            Back to all work
          </Link>
          <div className={styles.heroImage}>
            <span className={styles.photoCaption}>Residential craft / editorial systems</span>
          </div>
          <h1 id="project-title" className={styles.heroTitle}>
            Southtown
          </h1>
        </section>

        <section className={styles.info}>
          <div className={styles.infoGrid}>
            <div className={styles.copyBlock}>
              <p className={styles.eyebrow}>Southtown Design+Build</p>
              <p>
                A brand system for a design-build studio with old-house discipline, modern taste,
                and a construction process that feels clear from the first conversation. The concept
                pairs oversized editorial typography with a warm, durable palette and tactile visual
                language.
              </p>
            </div>

            <aside className={styles.metaPanel} aria-label="Project services">
              <dl className={styles.metaList}>
                <div>
                  <dt>Role</dt>
                  <dd>Creative Direction, Brand Strategy</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>2026</dd>
                </div>
                <div>
                  <dt>Client</dt>
                  <dd>Concept Case Study</dd>
                </div>
              </dl>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href="https://quinnbrewer.com" className={styles.visitButton}>
                Visit Live Website
              </a>
            </aside>
          </div>
        </section>

        <section className={styles.fullWidthFeature} aria-label="Southtown brand application">
          <div>
            <span>Brand application</span>
            <strong>Warm systems for old-house work.</strong>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>01</p>
            <div>
              <h2>Owning the corner detail</h2>
              <p>
                The identity borrows from architectural notches, trim profiles, and job-site
                measurements. Those details become a simple visual language that can hold everything
                from business cards to project case studies.
              </p>
            </div>
          </div>
          <div className={styles.imageGrid}>
            <div className={`${styles.imageTile} ${styles.tallTile}`}>
              <span>Framing</span>
            </div>
            <div className={`${styles.imageTile} ${styles.lightTile}`}>
              <span>Material Notes</span>
            </div>
            <div className={`${styles.imageTile} ${styles.oxbloodTile}`}>
              <span>Site Rhythm</span>
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>02</p>
            <div>
              <h2>Color, pattern, and texture</h2>
              <p>
                The palette needed to feel refined without becoming precious. Warm oxblood, linen,
                clay, and charcoal keep the system grounded while leaving enough contrast for large
                editorial layouts and utility-driven web moments.
              </p>
            </div>
          </div>
          <div className={styles.paletteStory}>
            <div className={styles.swatchGrid}>
              <span className={styles.swatchOxblood}>Oxblood</span>
              <span className={styles.swatchCream}>Linen</span>
              <span className={styles.swatchClay}>Clay</span>
              <span className={styles.swatchInk}>Ink</span>
            </div>
            <div className={styles.bodyCopy}>
              <p>
                Pattern is used sparingly: as a quiet construction grid, a clipped photo mask, or a
                background system behind calls to action. The result feels tactile without making the
                brand harder to use.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>03</p>
            <div>
              <h2>A web page that feels like a site walk</h2>
              <p>
                The site concept leads with confidence, then moves into process, proof, and useful
                details. The goal is to make a considered renovation feel less mysterious before a
                homeowner ever books a call.
              </p>
            </div>
          </div>
          <div className={styles.websitePanel}>
            <div className={styles.browserMock}>
              <span />
              <strong>Design, build, restore.</strong>
              <p>Clear steps, proof points, and a visual system that makes the process feel solid.</p>
            </div>
            <div className={styles.processCards}>
              <article>
                <span>01</span>
                <h3>Plan</h3>
                <p>Clear expectations, scope, and visual direction before construction begins.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Build</h3>
                <p>Progress updates and durable systems that keep the project moving.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Restore</h3>
                <p>Final details that honor the old house while making it easier to live in.</p>
              </article>
            </div>
          </div>
        </section>

        <nav className={styles.projectNav} aria-label="Project navigation">
          <Link href="/works">Previous Project</Link>
          <Link href="/works">Next Project</Link>
        </nav>

        <ContactCTA />
      </main>
    </WorkMockShell>
  );
}
