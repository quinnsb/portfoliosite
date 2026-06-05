import type { Metadata } from "next";
import Image from "next/image";
import ContactCTA from "@/components/layout/ContactCTA";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Quinn Brewer, a creative marketing leader focused on strategy, storytelling, and multimedia production.",
};

const experienceGroups = [
  {
    company: "Daymade Creative Agency",
    href: "https://www.daymade.co/",
    roles: [
      {
        title: "Marketing Director",
        dates: "May 2025 - Present",
      },
      {
        title: "Content Marketing Strategist",
        dates: "April 2024 - April 2025",
      },
    ],
    summary:
      "Lead digital strategy and execution across client accounts, connecting creative direction, content systems, paid media, email, SEO, analytics, and client communication into campaigns built to earn trust and move measurable results.",
    highlights: [
      "Guide cross-functional work with strategists, designers, developers, and account leads.",
      "Shape internal and external communication strategies that keep messaging clear across channels.",
      "Use performance data to refine campaign decisions and improve outcomes over time.",
    ],
  },
  {
    company: "Collegiate Church Network",
    href: "https://www.collegiate.church/",
    roles: [
      {
        title: "Communications Director",
        dates: "January 2023 - Present",
      },
    ],
    summary:
      "Lead communications for a national church network, shaping messaging, content systems, event communication, and visual consistency for leaders working across collegiate ministry, church planting, and leadership development.",
    highlights: [
      "Build communication strategy for network-wide initiatives, leadership events, and resource launches.",
      "Write, edit, and organize content that helps complex ministry ideas feel clear and usable.",
      "Support brand consistency across web, email, social, print, and event touchpoints.",
    ],
  },
  {
    company: "The Forgotten Initiative",
    href: "https://theforgotteninitiative.org/",
    roles: [
      {
        title: "Communications Director",
        dates: "July 2023 - March 2024",
      },
      {
        title: "Creative Content Producer",
        dates: "June 2021 - July 2023",
      },
    ],
    summary:
      "Led creative communication for a national nonprofit, building campaigns and content across social, email, video, podcast, web, fundraising, live events, and education resources while managing collaborators and protecting the clarity of the mission.",
    highlights: [
      "Partnered with donor development to support fundraising communication, donor acquisition, and retention.",
      "Produced and elevated multimedia work across podcasting, video production, graphic design, and events.",
      "Helped build annual communication plans, audience segmentation, reporting, and advocate recruitment efforts.",
    ],
  },
  {
    company: "Bright Trip",
    href: "https://brighttrip.com/",
    roles: [
      {
        title: "Initial Launch Team / Production Lead",
        dates: "Launch team",
      },
    ],
    summary:
      "Helped launch a video travel course company from the ground up, working across production planning, on-location shoots, editorial leadership, post-production, and pre-production writing.",
    highlights: [
      "Led a group of editors through course production and post-production workflows.",
      "Traveled on location multiple times to support production and capture course material.",
      "Contributed to pre-production writing, production systems, and launch-ready creative execution.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.aboutHero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <h1 className={styles.heroTitle}>
              Hi, I&apos;m <span className="accent-font-italic">Quinn.</span>
            </h1>
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
          <div className={styles.secondaryImage}>
            <Image
              src="/images/about/Daymade-16.jpg"
              alt="Quinn Brewer smiling"
              fill
              sizes="(max-width: 900px) 90vw, 620px"
              className={styles.image}
              priority
            />
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
        <div className={`container ${styles.historyGrid}`}>
          <h2 className={styles.sectionTitle}>
            <span className="accent-font-italic">Work</span>
            <br />
            history
          </h2>
          <div className={styles.timeline}>
            {experienceGroups.map((group) => (
              <article key={group.company} className={styles.job}>
                <div className={styles.jobHeader}>
                  <div>
                    <h3>
                      <a
                        href={group.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.companyLink}
                      >
                        {group.company}
                      </a>
                    </h3>
                  </div>
                  <div className={styles.roleList}>
                    {group.roles.map((role) => (
                      <p key={`${group.company}-${role.title}`}>
                        <strong>{role.title}</strong>
                        <span>{role.dates}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <p className={styles.summary}>{group.summary}</p>
                <ul>
                  {group.highlights.map((bullet) => (
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
