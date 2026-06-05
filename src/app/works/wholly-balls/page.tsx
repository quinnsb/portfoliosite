import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/layout/ContactCTA";
import WorkMockShell from "@/components/work-mock/WorkMockShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Wholly Balls — Quinn Brewer",
  description:
    "A brand identity, packaging design, and visual system for Wholly Balls protein bites.",
};

const tags = ["Brand Identity", "Packaging Design", "Art Direction", "Brand Guidelines", "CPG"];

const guidePages = [
  { src: "/images/projects/wholly-balls/brand-guide/page-02.png", alt: "Wholly Balls logo lockups" },
  { src: "/images/projects/wholly-balls/brand-guide/page-04.png", alt: "Wholly Balls color palette" },
  { src: "/images/projects/wholly-balls/brand-guide/page-06.png", alt: "Milkbar type specimen" },
  { src: "/images/projects/wholly-balls/brand-guide/page-07.png", alt: "Dumpling type specimen" },
];

const mockupImages = ["12", "13", "14", "15", "04", "05"];

export default function WhollyBallsPage() {
  return (
    <WorkMockShell>
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="project-title">
          <Link href="/works" className={styles.backLink}>
            Back to all work
          </Link>
          <div className={styles.heroImage} aria-label="Wholly Balls brand feature graphic">
            <span className={styles.heroPattern} aria-hidden="true" />
            <Image
              src="/images/projects/wholly-balls/logo-light-cream-transparent.png"
              alt=""
              width={1024}
              height={473}
              priority
              className={styles.heroLogo}
            />
          </div>
          <h1 id="project-title" className={styles.srOnly}>
            Wholly Balls
          </h1>
        </section>

        <section className={styles.info}>
          <div className={styles.infoGrid}>
            <div className={styles.copyBlock}>
              <p className={styles.eyebrow}>Protein bites with personality</p>
              <p>
                Wholly Balls needed a complete rebrand and packaging system that could make a small
                protein bites company feel more memorable, expressive, and shelf-ready. The direction
                balances bold snack energy with an outdoorsy, better-for-you attitude: punchy type,
                bright flavor color, organic pattern, and a name that should feel impossible to ignore.
              </p>
            </div>

            <aside className={styles.metaPanel} aria-label="Project details">
              <dl className={styles.metaList}>
                <div>
                  <dt>Role</dt>
                  <dd>Brand Identity, Packaging Design</dd>
                </div>
                <div>
                  <dt>Client</dt>
                  <dd>Wholly Balls</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Complete rebrand and packaging system</dd>
                </div>
              </dl>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.fullWidthFeature} aria-label="Wholly Balls pattern system">
          <Image
            src="/images/projects/wholly-balls/brand-guidelines-overview.png"
            alt="Wholly Balls brand guidelines overview showing logo, color palette, typography, flavors, packaging, and brand assets"
            fill
            sizes="100vw"
            className={styles.featureImage}
          />
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>01</p>
            <div>
              <h2>Turning a funny name into a real brand</h2>
              <p>
                The rebrand leans into the confidence of the name without making the product feel like
                a novelty. Big, rounded letterforms give the identity a friendly punch, while the
                supporting system keeps it flexible enough for labels, merch, social, and brand guide
                documentation.
              </p>
            </div>
          </div>
          <div className={styles.logoGrid}>
            <div className={styles.logoPanel}>
              <Image
                src="/images/projects/wholly-balls/brand-guide/page-02.png"
                alt="Wholly Balls primary and horizontal logo lockups"
                fill
                sizes="(max-width: 900px) 100vw, 62vw"
                className={styles.panelImage}
              />
            </div>
            <div className={styles.brandNote}>
              <span>Brand idea</span>
              <p>
                The identity needed to feel approachable, a little cheeky, and still polished enough to
                support a food product. The mark does the heavy lifting: simple, loud, and easy to
                recognize fast.
              </p>
            </div>
          </div>
          <div className={styles.flavorLogoGrid} aria-label="Flavor-specific logo treatments">
            <figure className={styles.flavorLogoPanel}>
              <Image
                src="/images/projects/wholly-balls/logo-mac-daddy.png"
                alt="Mac Daddy flavor logo with teal and cyan type and a protein bite in the O"
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
                className={styles.flavorLogoImage}
              />
            </figure>
            <figure className={styles.flavorLogoPanel}>
              <Image
                src="/images/projects/wholly-balls/logo-birthday-bash.png"
                alt="Birthday Bash flavor logo with orange, yellow, and pink type and a protein bite in the O"
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
                className={styles.flavorLogoImage}
              />
            </figure>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>02</p>
            <div>
              <h2>Building a colorful flavor system</h2>
              <p>
                The palette gives the brand room to organize flavors while keeping the whole family
                connected. Teal, citrus, berry, earth, and cream tones let the packaging feel energetic
                without losing the natural-food cues.
              </p>
            </div>
          </div>
          <div className={styles.guideGrid}>
            {guidePages.map((page) => (
              <figure key={page.src} className={styles.guideCard}>
                <Image src={page.src} alt={page.alt} fill sizes="(max-width: 900px) 100vw, 44vw" />
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>03</p>
            <div>
              <h2>Letting the product texture lead</h2>
              <p>
                Instead of over-staging the mockups, the system uses real product texture as part of
                the identity. Protein bites, ingredient color, and the WB shorthand become graphic
                material that can work across simple packaging and campaign assets.
              </p>
            </div>
          </div>
          <div className={styles.productSystem}>
            <div className={styles.productPage}>
              <Image
                src="/images/projects/wholly-balls/brand-guide/page-05.png"
                alt="Wholly Balls protein bite product photography grid"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.panelImage}
              />
            </div>
            <div className={styles.productPage}>
              <Image
                src="/images/projects/wholly-balls/brand-guide/page-09.png"
                alt="Wholly Balls WB shorthand logo experiments with product texture"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.panelImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p>04</p>
            <div>
              <h2>Packaging as a brand carrier</h2>
              <p>
                The packaging mockups are here to show the system in context, not to overpower the
                brand work. The label direction keeps the mark prominent and lets color, type, and
                product texture do most of the communication.
              </p>
            </div>
          </div>
          <div className={styles.packagingGrid}>
            <figure className={styles.landscapeMockup}>
              <Image
                src="/images/projects/wholly-balls/wholly-balls-mockup-og-landscape.png"
                alt="Wholly Balls original flavor packaging mockup"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.mockupImage}
              />
            </figure>
            <figure className={styles.portraitMockup}>
              <Image
                src="/images/projects/wholly-balls/wholly-balls-mockup-mastachio-portrait.png"
                alt="Wholly Balls Mastachio packaging mockup"
                fill
                sizes="(max-width: 900px) 100vw, 32vw"
                className={styles.mockupImage}
              />
            </figure>
          </div>
          <div className={styles.mockupGallery} aria-label="Additional packaging mockup explorations">
            {mockupImages.map((id) => (
              <figure key={id} className={styles.mockupCard}>
                <Image
                  src={`/images/projects/wholly-balls/mockups/mockup-${id}.png`}
                  alt="Wholly Balls packaging mockup exploration"
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                  className={styles.mockupImage}
                />
              </figure>
            ))}
          </div>
        </section>

        <nav className={styles.projectNav} aria-label="Project navigation">
          <Link href="/works">Previous Project</Link>
          <Link href="/works/southtown-design-build">Next Project</Link>
        </nav>

        <ContactCTA />
      </main>
    </WorkMockShell>
  );
}
