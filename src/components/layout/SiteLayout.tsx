import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import AIChatbot from "./AIChatbot";
import { useEffect } from "react";
import { projects } from "@/data/site";

const seoMap: Record<string, { title: string; description: string }> = {
  "/": {
    title: "IMI Group — Inquire. Motivate. Inspire.",
    description: "Premium African technology company. Websites, apps, AI, branding, media and automation for businesses and organizations.",
  },
  "/about": {
    title: "About — IMI Group",
    description: "Learn about IMI Group, our mission to equip African businesses with premium digital tools, and our three-division ecosystem.",
  },
  "/services": {
    title: "Services — IMI Group",
    description: "Explore our premium services: website development, branding, photography, videography, AI strategy and automation.",
  },
  "/portfolio": {
    title: "Portfolio — IMI Group",
    description: "Browse curated folders of IMI's creative work in websites, branding, photography, videography and AI systems.",
  },
  "/projects": {
    title: "Projects — IMI Group",
    description: "Read featured case studies from IMI Group including Zim Uni Hub, Murimi.AI and more.",
  },
  "/pricing": {
    title: "Pricing — IMI Group",
    description: "Transparent service packages for website development, branding, media, AI and automation. Honest pricing, customizable.",
  },
  "/testimonials": {
    title: "Testimonials — IMI Group",
    description: "Hear from clients who trust IMI Group for websites, branding, media and technology solutions.",
  },
  "/insights": {
    title: "Insights — IMI Group",
    description: "Ideas and articles from the IMI desk on technology, branding, AI and digital growth for African businesses.",
  },
  "/blog": {
    title: "Insights — IMI Group",
    description: "Ideas and articles from the IMI desk on technology, branding, AI and digital growth for African businesses.",
  },
  "/contact": {
    title: "Contact — IMI Group",
    description: "Get in touch with IMI Group. WhatsApp, email or send a message for projects, partnerships or quotes.",
  },
  "/book": {
    title: "Book — IMI Group",
    description: "Book a free consultation with IMI Group. No obligation. We'll respond within 24 hours.",
  },
  "/book-consultation": {
    title: "Book — IMI Group",
    description: "Book a free consultation with IMI Group. No obligation. We'll respond within 24 hours.",
  },
  "/booking-confirmation": {
    title: "Booking Confirmation — IMI Group",
    description: "Review your IMI Group consultation request and send it via WhatsApp.",
  },
  "/admin": {
    title: "Admin — IMI Group",
    description: "IMI Group admin dashboard. Manage leads, bookings, payments, portfolio and analytics.",
  },
  "/payments": {
    title: "Payments — IMI Group",
    description: "Pay for packages, request invoices, upload proof of payment and track confirmation status with IMI.",
  },
  "/gallery": {
    title: "Gallery — IMI Group",
    description: "IMI Gallery Studio. Browse, upload and showcase creative work in organized public and private galleries.",
  },
  "/projects-gallery": {
    title: "Gallery — IMI Group",
    description: "IMI Gallery Studio. Browse, upload and showcase creative work in organized public and private galleries.",
  },
  "/albums": {
    title: "Albums — IMI Group",
    description: "Browse albums and collections inside IMI's gallery system.",
  },
  "/categories": {
    title: "Categories — IMI Group",
    description: "Explore media categories across IMI's gallery including branding, photography, websites and events.",
  },
  "/media-library": {
    title: "Media Library — IMI Group",
    description: "Search and filter every uploaded image and video in the IMI Gallery Studio media library.",
  },
  "/upload": {
    title: "Upload — IMI Group",
    description: "Upload images and videos to IMI Gallery Studio. Organize by gallery, album and category.",
  },
  "/admin/gallery": {
    title: "Admin Gallery — IMI Group",
    description: "Manage galleries, projects, categories and client preview links in IMI Gallery Studio.",
  },
  "/auth": {
    title: "Sign In — IMI Group",
    description: "Sign in to IMI Gallery Studio to upload, organize and showcase creative work.",
  },
};

function getRouteSEO(pathname: string) {
  if (seoMap[pathname]) return seoMap[pathname];

  if (pathname.startsWith("/projects/")) {
    const slug = pathname.split("/")[2];
    const p = projects.find((x) => x.slug === slug);
    return {
      title: `${p?.title || "Project"} — IMI Group`,
      description: `Detailed case study for ${p?.title || "project"} by IMI Group. Problem, solution, features and impact.`,
    };
  }

  if (pathname.startsWith("/gallery/")) {
    return {
      title: "Gallery — IMI Group",
      description: "Browse creative work in this IMI gallery. Images, videos and projects.",
    };
  }

  if (pathname.startsWith("/client-preview/")) {
    return {
      title: "Client Preview — IMI Group",
      description: "Secure client preview of IMI creative work. View, comment and download approved assets.",
    };
  }

  return {
    title: "IMI Group — Inquire. Motivate. Inspire.",
    description: "Premium African technology company. Websites, apps, AI, branding, media and automation for businesses and organizations.",
  };
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const seo = getRouteSEO(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={pathname} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={pathname} />
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
