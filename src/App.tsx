import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/layout/SiteLayout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Pricing from "./pages/Pricing.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Insights from "./pages/Insights.tsx";
import Contact from "./pages/Contact.tsx";
import Book from "./pages/Book.tsx";
import Admin from "./pages/Admin.tsx";
import Payments from "./pages/Payments.tsx";
import Gallery from "./pages/Gallery.tsx";
import GalleryDetail from "./pages/GalleryDetail.tsx";
import Albums from "./pages/Albums.tsx";
import Categories from "./pages/Categories.tsx";
import MediaLibrary from "./pages/MediaLibrary.tsx";
import Upload from "./pages/Upload.tsx";
import AdminGallery from "./pages/AdminGallery.tsx";
import ClientPreview from "./pages/ClientPreview.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/blog" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
