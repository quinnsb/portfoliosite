import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import ContactCTA from "@/components/layout/ContactCTA";
import CaseStudyHero from "@/components/works/CaseStudyHero";
import ImageGallery from "@/components/works/ImageGallery";
import { mdxComponents } from "@/components/works/MDXComponents";
import PrevNextNav from "@/components/works/PrevNextNav";
import ProjectMeta from "@/components/works/ProjectMeta";
import ProjectTestimonial from "@/components/works/ProjectTestimonial";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import styles from "./page.module.css";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.frontmatter.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <main>
      <CaseStudyHero image={frontmatter.heroImage} title={frontmatter.title} />
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introGrid}>
            <h1 className={styles.title}>{frontmatter.title}</h1>
            <p className={styles.description}>{frontmatter.description}</p>
          </div>
          <ProjectMeta
            role={frontmatter.role}
            year={frontmatter.year}
            client={frontmatter.client}
          />
        </div>
      </section>
      <section className={styles.content}>
        <div className="container">
          <MDXRemote source={content} components={mdxComponents} />
          <ImageGallery
            images={frontmatter.images}
            layout={frontmatter.imageLayout}
            title={frontmatter.title}
          />
          {frontmatter.testimonial && (
            <ProjectTestimonial testimonial={frontmatter.testimonial} />
          )}
          <PrevNextNav previous={previous} next={next} />
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
