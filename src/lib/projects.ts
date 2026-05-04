import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types/project";

const projectsDirectory = path.join(process.cwd(), "content/projects");

function readProjectFile(slug: string): Project {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): Project[] {
  const fileNames = fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  return fileNames
    .map((fileName) => readProjectFile(fileName.replace(/\.mdx$/, "")))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return readProjectFile(slug);
}

export function getAdjacentProjects(slug: string) {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex((project) => project.frontmatter.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: projects[(currentIndex - 1 + projects.length) % projects.length].frontmatter,
    next: projects[(currentIndex + 1) % projects.length].frontmatter,
  };
}
