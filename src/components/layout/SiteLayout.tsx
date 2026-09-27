import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import AIChatbot from "./AIChatbot";
import { useEffect } from "react";
import { projects } from "@/data/site";

const SITE_URL = "https://www.imitechnologies.co.zw";

const seoMap: Record<string, { title: string; description: string }> = {
  "/": { title: "IMI Group — Inquire. Motivate. Inspire.", description: "Premium African technology, design and media solutions for ambitious organizations." },
  "/about": { title: "About — IMI Group", description: "Learn about IMI Group, our mission, divisions and future direction." },
  "/services": { title: "Services — IMI Group", description: "Explore IMI technology, design, media, AI and automation services." },
  "/design": { title: "IMI Design — Portfolio", description: "Explore selected IMI Design work across branding, posters, campaigns, social media and print." },
  "/portfolio": { title: "Portfolio — IMI Group", description: "Browse curated IMI Group work across websites, branding, media and technology." },
  "/projects": { title: "Projects — IMI Group", description: "Explore featured IMI Group projects and case studies." },
  "/pricing": { title: "Pricing — IMI Group", description: "Explore IMI service packages and request a tailored quote." },
  "/testimonials": { title: "Testimonials — IMI Group", description: "Client perspectives and project experiences with IMI Group." },
  "/insights": { title: "Insights — IMI Group", description: "Insights on technology, branding, AI, media and digital growth." },
  "/blog": { title: "Insights — IMI Group", description: "Insights on technology, branding, AI, media and digital growth." },
  "/contact": { title: "Contact — IMI Group", description: "Contact IMI Group for projects, partnerships and consultations." },
  "/book": { title: "Book a Consultation — IMI Group", description: "Book a consultation with IMI Group." },
  "/gallery": { title: "Gallery — IMI Group", description: "Browse IMI creative work and gallery collections." },
};

function getRouteSEO(pathname: string) {
  if (seoMap[pathname]) return seoMap[pathname];
  if (pathname.startsWith("/projects/")) {
    const slug = pathname.split("/")[2];
    const project = projects.find((item) => item.slug === slug);
    return {
      title: `${project?.title || "Project"} — IMI Group`,
      description: `Case study for ${project?.title || "project"} by IMI Group.`,
    };
  }
  if (pathname.startsWith("/gallery/") || pathname.startsWith("/client-preview/")) {
    return { title: "IMI Gallery — IMI Group", description: "Creative work from IMI Group." };
  }
  return seoMap["/"];
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const seo = getRouteSEO(pathname);
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Navbar />
      <main key={pathname} className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
}
