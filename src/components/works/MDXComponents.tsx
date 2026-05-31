import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import styles from "./MDXComponents.module.css";

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className={styles.lead}>{children}</p>;
}

function StatGrid({ children }: { children: ReactNode }) {
  return <div className={styles.statGrid}>{children}</div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function WorkGrid({ children }: { children: ReactNode }) {
  return <div className={styles.workGrid}>{children}</div>;
}

function WorkCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.workCard}>
      <h3 className={styles.workCardTitle}>{title}</h3>
      <div className={styles.workCardBody}>{children}</div>
    </article>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return <aside className={styles.callout}>{children}</aside>;
}

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className={styles.h2} {...props} />,
  h3: (props) => <h3 className={styles.h3} {...props} />,
  p: (props) => <p className={styles.p} {...props} />,
  ul: (props) => <ul className={styles.ul} {...props} />,
  li: (props) => <li className={styles.li} {...props} />,
  Eyebrow,
  Lead,
  StatGrid,
  Stat,
  WorkGrid,
  WorkCard,
  Callout,
};
