import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X, MessageCircle, ChevronDown, Settings } from "lucide-react";
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
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isScrollingRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setDropdownOpen(null);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, "_blank");
  };

  const handleNavClick = useCallback((path: string) => {
    const sectionId = pathSectionMap[path];
    console.log('handleNavClick:', { path, sectionId, currentPath: location.pathname });
    
    if (location.pathname === "/" && sectionId) {
      // For all sections, scroll to position first, then animate
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isScrollingRef.current = true;
          setActiveSection(sectionId);
          window.dispatchEvent(new CustomEvent('pageTransition'));
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 1000);
          }, 100);
        }, 100);
      }
      return;
    }
    // Force page transition animation even if staying on same page
    if (location.pathname === path) {
      // Trigger a re-render to show transition
      window.dispatchEvent(new CustomEvent('pageTransition'));
      setTimeout(() => {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            setActiveSection(sectionId);
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 350);
    } else {
      navigate(path);
    }
  }, [location.pathname, navigate]);

  const handleSubmenuClick = useCallback((path: string) => {
    console.log('handleSubmenuClick:', { path, currentPath: location.pathname });
    if (path === "/") {
      // Resumen - navigate to home and scroll to propiedades section
      if (location.pathname === "/") {
        const el = document.getElementById("propiedades");
        if (el) {
          isScrollingRef.current = true;
          setActiveSection("propiedades");
          el.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000);
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById("propiedades");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (path === "/") {
      // Destacadas - scroll to position first, then show animation
      console.log('Destacadas clicked from submenu - scrolling to position');
      const el = document.getElementById("propiedades");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isScrollingRef.current = true;
          setActiveSection("propiedades");
          window.dispatchEvent(new CustomEvent('pageTransition'));
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 1000);
          }, 100);
        }, 100);
      }
    } else {
      // Ver Todas - navigate to properties page
      if (location.pathname === path) {
        // Force transition animation when already on properties page
        window.dispatchEvent(new CustomEvent('pageTransition'));
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 350);
      } else {
        navigate(path);
      }
    }
    setDropdownOpen(null);
  }, [navigate, location.pathname]);

  const toggleDropdown = useCallback((itemName: string) => {
    setDropdownOpen(dropdownOpen === itemName ? null : itemName);
  }, [dropdownOpen]);

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
          ? "bg-[#0F172A] border-b border-[#1E293B]"
          : "bg-[#0F172A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-3 group cursor-pointer">
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
              {siteConfig.brand.logo}
            </div>
            <div className="block sm:hidden">
              <div className="text-lg font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {siteConfig.brand.name}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {siteConfig.brand.name}
              </div>
              <div className="text-xs text-[#94A3B8] group-hover:scale-105 transition-transform">{siteConfig.brand.tagline}</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.main.map((item) => (
              <div key={item.path} className="relative" ref={item.name === "Propiedades" ? dropdownRef : undefined}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      toggleDropdown(item.name);
                    } else {
                      handleNavClick(item.path);
                    }
                  }}
                  className={`relative text-sm font-medium transition-colors hover:text-[#8B5CF6] cursor-pointer bg-transparent border-0 p-0 flex items-center gap-1 ${
                    isActive(item.path)
                      ? "text-[#8B5CF6]"
                      : "text-[#CBD5E1]"
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      dropdownOpen === item.name ? "rotate-180" : ""
                    }`} />
                  )}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.submenu && dropdownOpen === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#1E293B] border border-[#334155] rounded-lg shadow-xl z-50">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.path}
                        onClick={() => handleSubmenuClick(subItem.path)}
                        className="w-full text-left px-4 py-3 text-sm text-[#CBD5E1] hover:text-[#8B5CF6] hover:bg-[#334155] transition-colors first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Contactar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-lg bg-[#1E293B] hover:bg-[#334155] transition-colors cursor-pointer text-white border border-[#334155]"
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
              <div key={item.path}>
                <button
                  onClick={() => { 
                    if (item.submenu) {
                      toggleDropdown(item.name);
                    } else {
                      handleNavClick(item.path); 
                      setIsMobileMenuOpen(false); 
                    }
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 flex items-center justify-between ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 text-[#8B5CF6]"
                      : "text-[#CBD5E1] hover:bg-[#1E293B]"
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      dropdownOpen === item.name ? "rotate-180" : ""
                    }`} />
                  )}
                </button>
                
                {/* Mobile Submenu */}
                {item.submenu && dropdownOpen === item.name && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.path}
                        onClick={() => { handleSubmenuClick(subItem.path); setIsMobileMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#8B5CF6]"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Contactar Ahora
            </Button>
          </div>
        </div>
      )}
      
      {/* Admin Access Link */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => window.location.href = '/admin'}
          className="bg-[#1E293B] border border-[#334155] hover:border-[#8B5CF6]/50 rounded-lg p-3 text-[#94A3B8] hover:text-[#8B5CF6] transition-all group shadow-lg"
          title="Acceso Administrativo"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
