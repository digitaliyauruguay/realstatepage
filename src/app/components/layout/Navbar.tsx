import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "../../../config/siteConfig";
import { Button } from "../ui/button";

const sectionIds = ["inicio", "propiedades", "sobre-nosotros", "testimonios", "preguntas-frecuentes", "contacto"];
const sectionPathMap: Record<string, string> = {
  "inicio": "/",
  "propiedades": "/properties",
  "sobre-nosotros": "/about",
  "testimonios": "/testimonials",
  "preguntas-frecuentes": "/faq",
  "contacto": "/contact",
};
const pathSectionMap: Record<string, string> = {
  "/": "inicio",
  "/properties": "propiedades",
  "/about": "sobre-nosotros",
  "/testimonials": "testimonios",
  "/faq": "preguntas-frecuentes",
  "/contact": "contacto",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to track active section on home page
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (path: string): boolean => {
    if (location.pathname === "/") {
      const sectionId = pathSectionMap[path];
      return activeSection === sectionId;
    }
    return location.pathname === path;
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, "_blank");
  };

  const handleNavClick = useCallback((path: string) => {
    const sectionId = pathSectionMap[path];
    if (location.pathname === "/" && sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        isScrollingRef.current = true;
        setActiveSection(sectionId);
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
        return;
      }
    }
    navigate(path);
  }, [location.pathname, navigate]);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      isScrollingRef.current = true;
      setActiveSection("inicio");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    } else {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0F172A]/95 backdrop-blur-lg border-b border-[#1E293B]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-3 group cursor-pointer">
            <div className="text-4xl group-hover:scale-110 transition-transform">
              {siteConfig.brand.logo}
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {siteConfig.brand.name}
              </div>
              <div className="text-xs text-[#94A3B8] group-hover:scale-105 transition-transform">{siteConfig.brand.tagline}</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.main.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`relative text-sm font-medium transition-colors hover:text-[#8B5CF6] cursor-pointer bg-transparent border-0 p-0 ${
                  isActive(item.path)
                    ? "text-[#8B5CF6]"
                    : "text-[#CBD5E1]"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]" />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-[#8B5CF6]/20 hover:shadow-[#8B5CF6]/40"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Contactar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-[#1E293B]">
          <div className="px-4 py-6 space-y-4">
            {siteConfig.navigation.main.map((item) => (
              <button
                key={item.path}
                onClick={() => { handleNavClick(item.path); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 text-[#8B5CF6]"
                    : "text-[#CBD5E1] hover:bg-[#1E293B]"
                }`}
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white px-6 py-3 rounded-lg font-medium"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Contactar Ahora
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
