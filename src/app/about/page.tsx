import type { Metadata } from "next";
import Image from "next/image";
import ContactCTA from "@/components/layout/ContactCTA";
import Button from "@/components/ui/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Quinn Brewer, a creative marketing leader focused on strategy, storytelling, and multimedia production.",
};

const jobs = [
  {
    role: "Marketing Director, M Studios Marketing",
    dates: "May 2025-Present",
    description:
      "Leads digital strategy across client accounts, manages direct reports, and oversees data-driven campaigns spanning paid media, email, SEO, and analytics.",
  },
  {
    role: "Content Marketing Strategist, M Studios Marketing",
    dates: "April 2024-April 2025",
    description:
      "Led internal and external communication strategies, managed targeted campaigns, and used data analytics to refine messaging approaches.",
  },
  {
    role: "Communications Director, The Forgotten Initiative",
    dates: "July 2023-March 2024",
    description:
      "Oversaw strategic creative communication while leading a team of direct reports, freelancers, and production collaborators.",
  },
  {
    role: "Creative Content Producer, The Forgotten Initiative",
    dates: "June 2021-July 2023",
    description:
      "Created video, podcasts, graphics, and in-person event experiences that helped stories travel with care and clarity.",
  },
];

const skills = [
  "Internal Communications",
  "Copywriting & Editing",
  "Strategic Growth",
  "Metrics & Analysis",
  "Interpersonal Skills",
  "Digital Tools",
  "Content Creation",
  "Collaborative Team Leadership",
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <h1 className={styles.title}>
              A strategic storyteller with a maker&apos;s eye.
            </h1>
            <p className={styles.intro}>
              Dynamic marketing leader driven to craft powerful messaging, ignite
              engagement, and fuel success through strategic storytelling and data-driven
              insights.
            </p>
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about/quinn-about-2026.jpg"
              alt="Quinn Brewer holding colorful coolers"
              fill
              sizes="(max-width: 860px) 90vw, 40vw"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <div>
            <p className={styles.eyebrow}>Background</p>
            <h2 className={styles.sectionTitle}>
              Creative direction, content systems, and campaigns that know where
              they&apos;re going.
            </h2>
          </div>
          <div className={styles.copy}>
            <p>
              Quinn Brewer is a marketing director and multimedia creative whose work
              sits at the intersection of message, visual identity, production, and
              measurable growth.
            </p>
            <p>
              Across agency and nonprofit environments, he has helped teams clarify
              what they need to say, shape how it should feel, and build the content
              engines to keep that message moving.
            </p>
            <p>
              He earned a BS in Creative Technology from Illinois State University in
              2020.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <div>
            <p className={styles.eyebrow}>Experience</p>
            <h2 className={styles.sectionTitle}>Where the work has happened.</h2>
          </div>
          <div className={styles.timeline}>
            {jobs.map((job) => (
              <article key={job.role} className={styles.job}>
                <h3>{job.role}</h3>
                <p className={styles.eyebrow}>{job.dates}</p>
                <p>{job.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.eyebrow}>Expertise</p>
          <ul className={styles.skills}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div className={styles.downloadPanel}>
            <h2>
              Want the formal version?
              <br />
              Grab the resume.
            </h2>
            <Button href="/quinn-brewer-resume.pdf">Download resume</Button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
