export type DesignCategory =
  | "Branding"
  | "Posters"
  | "Social Media"
  | "Campaigns"
  | "Logos"
  | "Print";

export type DesignPortfolioItem = {
  id: string;
  title: string;
  category: DesignCategory;
  year: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
};

export const PIXIESET_PORTFOLIO = "https://imimedia6.pixieset.com/imidesignxcutceos/";
export const PIXIESET_CUT_CEOS = "https://imimedia6.pixieset.com/imidesignxcutceos/cutceosgraphics/";
export const PIXIESET_REBRANDS = "https://imimedia6.pixieset.com/imidesignxcutceos/graphicrebrands/";
export const PIXIESET_STANDALONE = "https://imimedia6.pixieset.com/imidesignxcutceos/standalonedesigns/";

// Replace these URLs with approved IMI assets for production.
export const designPortfolio: DesignPortfolioItem[] = [
  {
    id: "cut-ceos-01",
    title: "CUT CEOs Graphics",
    category: "Campaigns",
    year: "2026",
    description: "Leadership-focused visual communication for CUT CEOs.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_CUT_CEOS,
    featured: true,
  },
  {
    id: "rebrand-01",
    title: "Graphic Rebrands",
    category: "Branding",
    year: "2026",
    description: "Identity refreshes designed for stronger digital presence.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_REBRANDS,
    featured: true,
  },
  {
    id: "standalone-01",
    title: "Standalone Designs",
    category: "Posters",
    year: "2026",
    description: "High-impact posters and standalone campaign visuals.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_STANDALONE,
    featured: true,
  },
  {
    id: "brand-02",
    title: "Executive Brand System",
    category: "Branding",
    year: "2026",
    description: "Premium visual direction for founders and executive brands.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_REBRANDS,
  },
  {
    id: "social-01",
    title: "Campaign Social Set",
    category: "Social Media",
    year: "2026",
    description: "A coordinated social toolkit built around a strong campaign idea.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_STANDALONE,
  },
  {
    id: "print-01",
    title: "Premium Print Direction",
    category: "Print",
    year: "2026",
    description: "Print-ready design direction for premium brand collateral.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_REBRANDS,
  },
  {
    id: "logo-01",
    title: "Identity Marks",
    category: "Logos",
    year: "2026",
    description: "Logo exploration and visual marks built for clarity and memorability.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_REBRANDS,
  },
  {
    id: "poster-02",
    title: "Event Poster Series",
    category: "Posters",
    year: "2026",
    description: "Editorial event graphics with strong hierarchy and bold composition.",
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1800&q=85",
    href: PIXIESET_CUT_CEOS,
  },
];

export const visualProjects = [
  {
    slug: "zim-uni-hub",
    title: "Zim Uni Hub",
    tag: "Digital Platform",
    description: "A digital hub connecting university students with resources, opportunities and community.",
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=2000&q=85",
  },
  {
    slug: "murimi-ai",
    title: "Murimi.AI",
    tag: "AgriTech AI",
    description: "An AI-powered farming assistant designed around African agricultural realities.",
    image: "https://images.unsplash.com/photo-1523742810367-b140bdb96d59?auto=format&fit=crop&w=2000&q=85",
  },
  {
    slug: "bioinsight-ai",
    title: "BioInsight.AI",
    tag: "HealthTech AI",
    description: "AI tooling for biomedical research and contextual data interpretation.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2000&q=85",
  },
  {
    slug: "cut-ceos-attendance",
    title: "CUT CEOs Attendance",
    tag: "Campus System",
    description: "A digital attendance and member management experience for CUT CEOs.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2000&q=85",
  },
];

export const mediaFeatureImages = [
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85",
];
