import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { siteConfig } from "../../../config/siteConfig";

const pathSectionMap: Record<string, string> = {
  "/": "inicio",
  "/properties": "propiedades",
  "/about": "sobre-nosotros",
  "/testimonials": "testimonios",
  "/faq": "preguntas-frecuentes",
  "/contact": "contacto",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = useCallback((path: string) => {
    const sectionId = pathSectionMap[path];
    if (sectionId) {
      if (location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.pathname, navigate]);

  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{siteConfig.brand.logo}</div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                  {siteConfig.brand.name}
                </div>
              </div>
            </div>
            <p className="text-[#94A3B8] text-sm mb-4">
              {siteConfig.brand.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#3B82F6] flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#3B82F6] flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#3B82F6] flex items-center justify-center transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#3B82F6] flex items-center justify-center transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#F8FAFC]">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.main.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors text-sm cursor-pointer bg-transparent border-0 p-0"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-[#F8FAFC]">Legal</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.footer.map((item) => (
                <li key={item.path}>
                  <span
                    className="text-[#94A3B8] text-sm"
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-[#F8FAFC]">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[#94A3B8]">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#8B5CF6]" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#94A3B8]">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#8B5CF6]" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#94A3B8]">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#8B5CF6]" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1E293B] text-center text-sm text-[#94A3B8]">
          <p>
            © {currentYear} {siteConfig.brand.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
