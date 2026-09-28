import imiCutCeosDinner from "@/assets/imi-cut-ceos-dinner.jpeg.asset.json";
import imiVelvetBloom from "@/assets/imi-velvet-bloom.jpeg.asset.json";
import imiCutCeosStore from "@/assets/imi-cut-ceos-store.jpeg.asset.json";
import imiUebertAngel from "@/assets/imi-uebert-angel.jpeg.asset.json";
import imiDharaLaunch from "@/assets/imi-dhara-launch.jpeg.asset.json";
import imiDesignOpen from "@/assets/imi-design-open.jpeg.asset.json";

export const services = [
  { slug: "website-development", title: "Website Development", division: "IMI Technologies", icon: "Globe", short: "Premium websites that convert.", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", solves: "Lack of credible online presence and conversion-ready websites.", helps: "Businesses, NGOs, churches, schools, startups, political & campus organizations.", deliverables: ["Custom design", "CMS setup", "SEO foundations", "Hosting guidance"] },
  { slug: "graphic-design", title: "Graphic Design", division: "IMI Designs", icon: "Palette", short: "Visuals that command attention.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80", solves: "Inconsistent visual identity and weak marketing collateral.", helps: "Brands launching products, events, and campaigns.", deliverables: ["Posters", "Flyers", "Social graphics", "Print collateral"] },
  { slug: "social-media-management", title: "Social Media Management", division: "IMI Technologies", icon: "Share2", short: "Grow audiences that convert.", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80", solves: "Slow audience growth and inconsistent posting.", helps: "Brands and personal brands building authority online.", deliverables: ["Content calendar", "Captions", "Engagement", "Monthly reports"] },
  { slug: "photography", title: "Photography", division: "IMI Media", icon: "Camera", short: "Editorial-grade brand imagery.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80", solves: "Low-quality visuals that hurt brand perception.", helps: "Brands, events, executives, products.", deliverables: ["On-location shoot", "Edited library", "Brand-ready exports"] },
  { slug: "videography", title: "Videography", division: "IMI Media", icon: "Video", short: "Cinematic stories that sell.", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80", solves: "Lack of compelling motion content.", helps: "Launches, events, brand films, ads.", deliverables: ["Concept", "Filming", "Post-production", "Multi-format delivery"] },
  { slug: "ai-strategy", title: "AI Strategy", division: "IMI Technologies", icon: "BrainCircuit", short: "AI roadmaps for African businesses.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80", solves: "Confusion on where AI fits and how to deploy.", helps: "SMEs, agritech, edtech, government partners.", deliverables: ["AI audit", "Use-case map", "Implementation roadmap"] },
  { slug: "business-automation", title: "Business Automation", division: "IMI Technologies", icon: "Workflow", short: "Replace manual work with systems.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", solves: "Repetitive admin work draining productivity.", helps: "Operations-heavy businesses ready to scale.", deliverables: ["Workflow audit", "Automations", "Dashboards"] },
  { slug: "branding", title: "Branding", division: "IMI Designs", icon: "Sparkles", short: "Identities built to last.", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=80", solves: "Forgettable brand presence.", helps: "Startups and rebrands ready to stand out.", deliverables: ["Logo system", "Brand guidelines", "Stationery", "Brand voice"] },
  { slug: "app-development", title: "App Development", division: "IMI Technologies", icon: "Smartphone", short: "Native-quality mobile apps.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80", solves: "Need for branded, scalable mobile experiences.", helps: "Founders building consumer or B2B mobile products.", deliverables: ["Product design", "iOS/Android build", "Backend", "App store launch"] },
  { slug: "tech-consulting", title: "Tech Consulting", division: "IMI Technologies", icon: "Briefcase", short: "Executive-level technology advisory.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", solves: "Costly tech decisions made without expertise.", helps: "Executives, founders, boards, public sector.", deliverables: ["Strategy sessions", "Vendor reviews", "Roadmaps"] },
];

export const divisions = [
  { name: "IMI Technologies", tagline: "Websites · Apps · AI · Automation · Consulting", icon: "Cpu" },
  { name: "IMI Designs", tagline: "Branding · Graphic Design · Posters · Visual Identity", icon: "Palette" },
  { name: "IMI Media", tagline: "Photography · Videography · Content · Media Production", icon: "Camera" },
];

export const projects = [
  { slug: "zim-uni-hub", title: "Zim Uni Hub", tag: "Web Platform", overview: "A digital hub connecting Zimbabwean university students with resources, opportunities, and community.", problem: "Students lack a single, trusted platform for academic, career, and campus life resources.", solution: "An all-in-one student platform built on modern web stack with curated content and community tools.", features: ["Opportunity board", "Resource library", "Events", "Community forums"], users: "University students across Zimbabwe.", future: "Pan-African expansion, mobile app, AI study assistant." },
  { slug: "murimi-ai", title: "Murimi.AI", tag: "AgriTech AI", overview: "AI-powered farming assistant tailored for African smallholder farmers.", problem: "Farmers lack timely, localized agronomic guidance.", solution: "Conversational AI providing crop, weather, and market intelligence in local languages.", features: ["Multilingual chat", "Crop advisory", "Weather alerts", "Market prices"], users: "Smallholder farmers, cooperatives, agribusinesses.", future: "Government partnerships, satellite integration, financing links." },
  { slug: "bioinsight-ai", title: "BioInsight.AI", tag: "HealthTech AI", overview: "AI tooling for biomedical data interpretation in African contexts.", problem: "Researchers and clinicians struggle to extract insights from biomedical data.", solution: "An AI assistant trained on biomedical knowledge for faster, contextualized analysis.", features: ["Data ingestion", "AI summaries", "Research workflows"], users: "Researchers, clinicians, students.", future: "Public-health dashboards, hospital integrations." },
  { slug: "cut-ceos-attendance", title: "CUT CEOs Attendance System", tag: "Campus System", overview: "Digital attendance system for the CUT CEOs campus organization.", problem: "Manual attendance tracking is slow and error-prone.", solution: "A premium digital attendance system with dashboards and reports.", features: ["QR check-in", "Member directory", "Reports", "Admin dashboard"], users: "Campus leadership and members.", future: "Multi-org platform, member engagement analytics." },
];

export const portfolio = [
  { title: "Zim Uni Hub", category: "Websites" },
  { title: "Murimi.AI Concept", category: "AI Systems" },
  { title: "BioInsight.AI Concept", category: "AI Systems" },
  { title: "CUT CEOs Dashboard", category: "Websites" },
  { title: "Brand Identity — Atlas Co.", category: "Branding" },
  { title: "Campaign Poster — Rise '26", category: "Posters" },
  { title: "Social Set — Lumen Café", category: "Social Media" },
  { title: "Executive Portrait Series", category: "Photography" },
  { title: "Brand Film — Mosi Studios", category: "Videography" },
  { title: "Automation Suite — OpsFlow", category: "AI Systems" },
  { title: "Corporate Site — Hararé Capital", category: "Websites" },
  { title: "Event Reel — Tech Summit", category: "Videography" },
];

export const insights = [
  { title: "AI for African Businesses", excerpt: "How to deploy AI pragmatically without a Silicon Valley budget.", category: "AI" },
  { title: "Why Every Business Needs a Website", excerpt: "Your website is the new storefront. Here's what makes it convert.", category: "Web" },
  { title: "Branding for Startups", excerpt: "A founder's guide to building a brand that earns trust early.", category: "Branding" },
  { title: "Business Automation for Growth", excerpt: "Replace busywork with systems and free up your best people.", category: "Automation" },
  { title: "Digital Transformation in Zimbabwe", excerpt: "Local case studies and what they teach us about scale.", category: "Strategy" },
  { title: "Student Entrepreneurs and Technology", excerpt: "How campus founders can leverage tech to launch fast.", category: "Founders" },
];

export const testimonials = [
  { name: "T. Moyo", role: "Founder, Atlas Co.", quote: "IMI delivered a brand that finally matches our ambition. Investors noticed within weeks." },
  { name: "Pastor R. Sibanda", role: "Lead Pastor, Grace Assembly", quote: "Our church website and media transformed how we connect with our community." },
  { name: "Dr. N. Chikore", role: "Researcher", quote: "BioInsight.AI is a game-changer for how we approach biomedical data." },
  { name: "K. Dube", role: "CEO, OpsFlow", quote: "The automation work paid for itself in a single quarter." },
  { name: "L. Mhlanga", role: "Student Founder", quote: "From Zim Uni Hub to launch in record time. The team gets it." },
  { name: "M. Ncube", role: "Director, Hararé Capital", quote: "Executive-grade work. Truly investor-ready." },
];

export const packages: Record<string, { tier: string; price: string; features: string[] }[]> = {
  "Website Development": [
    { tier: "Starter", price: "From $450", features: ["1-3 pages", "Mobile responsive", "Contact form"] },
    { tier: "Growth", price: "From $950", features: ["Up to 8 pages", "CMS", "Basic SEO", "Analytics"] },
    { tier: "Premium", price: "From $1,800", features: ["Custom design", "Advanced SEO", "Integrations"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Custom platform", "Dedicated team", "SLA"] },
  ],
  "Branding & Design": [
    { tier: "Starter", price: "From $250", features: ["Logo + basic kit"] },
    { tier: "Growth", price: "From $600", features: ["Full identity", "Stationery"] },
    { tier: "Premium", price: "From $1,200", features: ["Brand strategy", "Guidelines book"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Rebrand program"] },
  ],
  "Social Media Management": [
    { tier: "Starter", price: "From $180/mo", features: ["8 posts/mo"] },
    { tier: "Growth", price: "From $380/mo", features: ["16 posts", "Reels", "Engagement"] },
    { tier: "Premium", price: "From $750/mo", features: ["Daily content", "Ads light"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Full team"] },
  ],
  "Photography": [
    { tier: "Starter", price: "From $120", features: ["1hr shoot"] },
    { tier: "Growth", price: "From $300", features: ["Half day"] },
    { tier: "Premium", price: "From $600", features: ["Full day + retouch"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Multi-day campaign"] },
  ],
  "Videography": [
    { tier: "Starter", price: "From $250", features: ["Short reel"] },
    { tier: "Growth", price: "From $700", features: ["Brand video"] },
    { tier: "Premium", price: "From $1,500", features: ["Cinematic film"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Series production"] },
  ],
  "AI Strategy": [
    { tier: "Starter", price: "From $300", features: ["AI audit"] },
    { tier: "Growth", price: "From $900", features: ["Roadmap"] },
    { tier: "Premium", price: "From $2,500", features: ["Implementation plan"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Org-wide AI program"] },
  ],
  "Business Automation": [
    { tier: "Starter", price: "From $250", features: ["1 workflow"] },
    { tier: "Growth", price: "From $800", features: ["Multi-workflow"] },
    { tier: "Premium", price: "From $2,000", features: ["Full ops suite"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Custom systems"] },
  ],
  "App Development": [
    { tier: "Starter", price: "From $1,500", features: ["MVP single platform"] },
    { tier: "Growth", price: "From $4,000", features: ["iOS + Android"] },
    { tier: "Premium", price: "From $9,000", features: ["Full product"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Scale & DevOps"] },
  ],
  "Tech Consulting": [
    { tier: "Starter", price: "From $150/hr", features: ["Advisory hour"] },
    { tier: "Growth", price: "From $1,200/mo", features: ["Monthly retainer"] },
    { tier: "Premium", price: "From $3,000/mo", features: ["Fractional CTO"] },
    { tier: "Enterprise", price: "Request Quote", features: ["Board-level"] },
  ],
};
