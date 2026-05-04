import AboutTeaser from "@/components/home/AboutTeaser";
import HeroSection from "@/components/home/HeroSection";
import ProjectList from "@/components/home/ProjectList";
import ServicesSection from "@/components/home/ServicesSection";
import SneakPeekGallery from "@/components/home/SneakPeekGallery";
import TestimonialsGrid from "@/components/home/TestimonialsGrid";
import ContactCTA from "@/components/layout/ContactCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectList />
      <SneakPeekGallery />
      <ServicesSection />
      <TestimonialsGrid />
      <AboutTeaser />
      <ContactCTA />
    </main>
  );
}
