import { Link } from "react-router";
import { siteConfig } from "../../config/siteConfig";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
            {siteConfig.about.headline}
          </h1>
          <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
            {siteConfig.about.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {siteConfig.about.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1E293B] rounded-2xl p-8 text-center border border-[#334155] hover:border-[#8B5CF6]/50 transition-all group"
            >
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-3xl p-12 mb-20 border border-[#8B5CF6]/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#F8FAFC]">Nuestra Misión</h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              Creemos que todos merecen encontrar su propiedad perfecta sin el estrés y la complejidad
              que a menudo acompaña a las transacciones inmobiliarias. Nuestra misión es brindar una experiencia
              fluida, transparente y gratificante para compradores, vendedores e inquilinos. Combinamos tecnología
              de vanguardia con servicio personalizado para ayudarte a tomar la mejor decisión para tu futuro.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Conocé a Nuestro Equipo
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Profesionales apasionados dedicados a tu éxito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.about.team.map((member, index) => (
              <div
                key={index}
                className="bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#8B5CF6]/50 transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1 text-[#F8FAFC]">{member.name}</h3>
                  <div className="text-[#8B5CF6] mb-3">{member.role}</div>
                  <p className="text-[#94A3B8] text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Nuestros Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Transparencia</h3>
              <p className="text-[#94A3B8]">
                Creemos en la completa honestidad y claridad en cada transacción. Sin cargos ocultos, sin sorpresas.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Integridad</h3>
              <p className="text-[#94A3B8]">
                Hacemos lo correcto para nuestros clientes, incluso cuando no es el camino más fácil para nosotros.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Excelencia</h3>
              <p className="text-[#94A3B8]">
                Nos esforzamos por la excelencia en cada detalle, desde la selección de propiedades hasta el servicio al cliente.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            ¿Listo para Trabajar con Nosotros?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Encontremos tu propiedad perfecta juntos
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/properties">
              <Button className="bg-white text-[#8B5CF6] hover:bg-white/90 px-8 py-6 text-lg rounded-xl">
                Explorar Propiedades
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-6 text-lg rounded-xl border border-white/30">
                Contactanos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
