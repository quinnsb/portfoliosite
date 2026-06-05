import type { ReactNode } from "react";
import styles from "./WorkMockShell.module.css";

interface WorkMockShellProps {
  children: ReactNode;
}

export default function WorkMockShell({ children }: WorkMockShellProps) {
  return (
    <div className={styles.shell} id="top">
      <div className={styles.contentFrame}>{children}</div>
    </div>
  );
}
