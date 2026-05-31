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

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.title}>
              <span>I&apos;m Quinn,</span>
              <span className="accent-font-italic">creative marketing</span>
              <span>leader and</span>
              <span>multi-media wizard.</span>
            </h1>
            <p className={styles.intro}>
              I make strategy, stories, campaigns, podcasts, photos, videos, and
              whatever else helps a good idea become easier to understand and harder
              to ignore.
            </p>
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
                src="/images/about/Daymade-57.jpg"
                alt="Quinn Brewer headshot"
                fill
                sizes="(max-width: 1024px) 80vw, 42vw"
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionPanel}>
            <p className={`${styles.kicker} accent-font-italic`}>My mission</p>
            <h2>
              Make beautiful and excellent things with people I care about.
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.photoStack}>
            <div className={styles.secondaryImage}>
              <Image
                src="/images/about/Daymade-16.jpg"
                alt="Quinn Brewer smiling"
                fill
                sizes="(max-width: 900px) 90vw, 460px"
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.copy}>
            <h2 className={styles.sectionTitle}>
              <span className="accent-font-italic">The person</span>
              <br />
              behind the work
            </h2>
            <p>
              I care about making creative work that feels thoughtful, useful,
              and alive. Sometimes that means building a campaign strategy. Sometimes
              it means editing a podcast, writing the copy, shaping the art direction,
              or helping a team find the clearest version of what they are trying to say.
            </p>
            <p>
              I live with my wife and family in Normal, Illinois. Away from work,
              I&apos;m usually reading a long fantasy novel, cooking something too
              elaborate for a weeknight, birding, or finding a reason to be outside.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.historyGrid}`}>
          <h2 className={styles.sectionTitle}>
            <span className="accent-font-italic">Work</span>
            <br />
            history
          </h2>
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
