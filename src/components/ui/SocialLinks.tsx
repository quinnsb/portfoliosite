import { SOCIAL } from "@/lib/constants";

interface SocialLinksProps {
  className?: string;
  itemClassName?: string;
}

export default function SocialLinks({ className, itemClassName }: SocialLinksProps) {
  return (
    <ul className={className}>
      <li>
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          Instagram
        </a>
      </li>
      <li>
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          LinkedIn
        </a>
      </li>
    </ul>
  );
}
