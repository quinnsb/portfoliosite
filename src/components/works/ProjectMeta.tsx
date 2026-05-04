import styles from "./ProjectMeta.module.css";

interface ProjectMetaProps {
  role: string;
  year: string;
  client: string;
}

export default function ProjectMeta({ role, year, client }: ProjectMetaProps) {
  const items = [
    ["Role", role],
    ["Year", year],
    ["Client", client],
  ];

  return (
    <dl className={styles.meta}>
      {items.map(([label, value]) => (
        <div key={label} className={styles.item}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
