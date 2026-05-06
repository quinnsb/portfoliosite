import type { Metadata } from "next";
import Image from "next/image";
import ContactCTA from "@/components/layout/ContactCTA";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Quinn Brewer, a creative marketing leader focused on strategy, storytelling, and multimedia production.",
};

const jobs = [
  {
    role: "Marketing Director",
    company: "M Studios Marketing",
    href: "https://www.mstudiosmarketing.com/",
    dates: "May 2025 - Present",
    bullets: [
      "I lead digital strategy across client accounts, connecting creative, content, and performance.",
      "I oversee campaigns across paid media, email, SEO, and analytics so the work is clear, useful, and built to move.",
      "I work with strategists, designers, and developers to help good ideas become measurable results.",
    ],
  },
  {
    role: "Content Marketing Strategist",
    company: "M Studios Marketing",
    href: "https://www.mstudiosmarketing.com/",
    dates: "2024 - April 2025",
    bullets: [
      "I helped shape content strategies for clients across multiple platforms.",
      "I wrote, planned, and refined campaigns with a mix of storytelling, analytics, and brand consistency.",
      "I worked to make marketing systems easier to understand, repeat, and improve.",
    ],
  },
  {
    role: "Communications Director",
    company: "The Forgotten Initiative",
    href: "https://theforgotteninitiative.org/",
    dates: "2023 - 2024",
    bullets: [
      "I oversaw strategic creative communication for a national nonprofit ministry.",
      "I led direct reports, freelancers, and collaborators across social media, email, YouTube, podcast, and web.",
      "I helped build campaigns that served the mission while keeping execution clear and consistent.",
    ],
  },
  {
    role: "Creative Content Producer",
    company: "The Forgotten Initiative",
    href: "https://theforgotteninitiative.org/",
    dates: "2021 - 2023",
    bullets: [
      "I produced content marketing media across video, podcasts, graphic design, and in-person events.",
      "I collaborated with a team to keep messaging thoughtful, consistent, and useful.",
      "I pushed the standard of excellence forward for every piece of media we made.",
    ],
  },
];

const strengths = [
  "Lead full-funnel marketing strategies",
  "Create content that builds trust and drives action",
  "Turn insights into campaigns that convert",
  "Manage cross-functional teams and freelancers",
  "Build systems that scale with clarity and consistency",
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about/quinn-about-2026.jpg"
              alt="Quinn Brewer smiling"
              fill
              sizes="(max-width: 860px) 86vw, 30vw"
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.heroCopy}>
            <h1 className={styles.title}>
              I&apos;m Quinn, a marketing leader and multimedia creative.
            </h1>
            <p className={styles.intro}>
              I care about strategy, storytelling, and making work that feels thoughtful,
              excellent, and alive.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <h2 className={styles.sectionTitle}>My Mission</h2>
          <div className={styles.statement}>
            <p>
              My mission is to make the world a better place by creating beautiful
              &amp; excellent things with people I care about.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <h2 className={styles.sectionTitle}>A Bit More</h2>
          <div className={styles.copy}>
            <p>
              I live with my wife and family in Normal, Illinois. I like birding,
              reading long fantasy novels, cooking elaborate recipes, and hanging
              out with my dog Koda.
            </p>
            <p>
              Thanks for checking out my work.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <h2 className={styles.sectionTitle}>What I Do Best</h2>
          <ul className={styles.strengths}>
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <h2 className={styles.sectionTitle}>Work History</h2>
          <div className={styles.timeline}>
            {jobs.map((job) => (
              <article key={`${job.role}-${job.company}`} className={styles.job}>
                <h3>
                  {job.role} <span>at </span>
                  <a href={job.href} target="_blank" rel="noreferrer">
                    {job.company}
                  </a>
                </h3>
                <p className={styles.dates}>{job.dates}</p>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
