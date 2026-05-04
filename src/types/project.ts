export interface ProjectTestimonial {
  quote: string;
  author: string;
  title: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  role: string;
  year: string;
  client: string;
  heroImage: string;
  images: string[];
  imageLayout?: ("full" | "grid")[];
  testimonial?: ProjectTestimonial;
  order: number;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
}
