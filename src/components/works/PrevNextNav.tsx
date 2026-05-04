import Link from "next/link";
import type { ProjectFrontmatter } from "@/types/project";
import styles from "./PrevNextNav.module.css";

interface PrevNextNavProps {
  previous: ProjectFrontmatter | null;
  next: ProjectFrontmatter | null;
}

export default function PrevNextNav({ previous, next }: PrevNextNavProps) {
  return (
    <nav className={styles.nav} aria-label="Project navigation">
      {previous && (
        <Link href={`/works/${previous.slug}`} className={styles.previous}>
          <span>Previous Project</span>
          <strong>{previous.title}</strong>
        </Link>
      )}
      {next && (
        <Link href={`/works/${next.slug}`} className={styles.next}>
          <span>Next Project</span>
          <strong>{next.title}</strong>
        </Link>
      )}
    </nav>
  );
}
