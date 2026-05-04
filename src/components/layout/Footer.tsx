import { SOCIAL } from "@/lib/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.made}>
          Made by <span className={styles.bold}>Quinn Brewer</span>
        </p>
        <ul className={styles.social}>
          <li>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <p className={styles.copyright}>Copyright © 2026. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
