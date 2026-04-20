import { Link } from "react-router";
import { siteConfig } from "../../config/siteConfig";
import { Button } from "../components/ui/button";
import { ArrowRight, Mail, Phone, Star } from "lucide-react";

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
              Hacer sueños realidad. Creemos que cada propiedad es más que un simple edificio - es el lugar donde se crean memorias,
              se construyen futuros y se viven los momentos más importantes de la vida. Nuestra misión es hacer posible lo imposible,
              encontrando el hogar perfecto para cada persona y transformando casas en hogares.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-[#1E293B] rounded-3xl p-12 mb-20 border border-[#334155]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#F8FAFC]">Nuestra Historia</h2>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6]/20 to-[#3B82F6]/20 border border-[#8B5CF6]/30 rounded-full text-[#8B5CF6] text-sm font-medium mb-6">
                <span className="text-2xl">🏢</span>
                5 Años de Excelencia Inmobiliaria
              </div>
            </div>
            <p className="text-lg text-[#CBD5E1] leading-relaxed text-center">
              Fundada hace 5 años con una visión clara: revolucionar el mercado inmobiliario uruguayo. Desde nuestro inicio,
              hemos ayudado a cientos de familias a encontrar su lugar en el mundo, combinando tecnología de punta con un
              servicio humano y cercano. Cada año hemos crecido, aprendido y evolucionado, manteniendo siempre nuestros valores
              éticos y morales como el compás que guía cada decisión.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#8B5CF6] mb-2">500+</div>
                <div className="text-[#94A3B8] text-sm">Propiedades Vendidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3B82F6] mb-2">98%</div>
                <div className="text-[#94A3B8] text-sm">Clientes Satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#06B6D4] mb-2">24/7</div>
                <div className="text-[#94A3B8] text-sm">Soporte Continuo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Conocé a Nuestro Equipo
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Profesionales apasionados dedicados a hacer sueños realidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Agent 1 */}
            <div className="bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#8B5CF6]/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                  alt="Agente Inmobiliario"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-[#F8FAFC]">Martín Rodríguez</h3>
                <div className="text-[#8B5CF6] mb-3">Director General</div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-[#94A3B8] ml-2">5.0 (127 reseñas)</span>
                </div>
                <p className="text-[#94A3B8] text-sm mb-4">
                  Con más de 8 años de experiencia, Martín lidera nuestro equipo con una pasión inquebrantable por encontrar el hogar perfecto para cada cliente.
                </p>
                <div className="flex gap-2">
                  <a href="tel:+59898765432" className="flex items-center gap-1 text-sm text-[#8B5CF6] hover:text-[#7C3AED]">
                    <Phone className="w-4 h-4" />
                    +598 987 654 32
                  </a>
                  <a href="mailto:martin@luxestate.com" className="flex items-center gap-1 text-sm text-[#8B5CF6] hover:text-[#7C3AED]">
                    <Mail className="w-4 h-4" />
                    martín@luxestate.com
                  </a>
                </div>
              </div>
            </div>

            {/* Agent 2 */}
            <div className="bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#8B5CF6]/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=400&q=80"
                  alt="Agente Inmobiliaria"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-[#F8FAFC]">Sofía Martínez</h3>
                <div className="text-[#8B5CF6] mb-3">Gerente de Ventas</div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-[#94A3B8] ml-2">5.0 (89 reseñas)</span>
                </div>
                <p className="text-[#94A3B8] text-sm mb-4">
                  Especialista en propiedades premium, Sofía combina su conocimiento del mercado con un enfoque humano que hace que cada cliente se sienta como familia.
                </p>
                <div className="flex gap-2">
                  <a href="tel:+59891234567" className="flex items-center gap-1 text-sm text-[#8B5CF6] hover:text-[#7C3AED]">
                    <Phone className="w-4 h-4" />
                    +598 912 345 67
                  </a>
                  <a href="mailto:sofia@luxestate.com" className="flex items-center gap-1 text-sm text-[#8B5CF6] hover:text-[#7C3AED]">
                    <Mail className="w-4 h-4" />
                    sofia@luxestate.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Nuestros Valores: El Compás de Nuestro Éxito
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Valores éticos y morales que guían cada decisión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] hover:border-[#8B5CF6]/50 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Hacer Sueños Realidad</h3>
              <p className="text-[#94A3B8]">
                Cada propiedad que vendemos no es solo una transacción, es un sueño hecho realidad para una familia.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] hover:border-[#8B5CF6]/50 transition-all">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Hacer Posible lo Imposible</h3>
              <p className="text-[#94A3B8]">
                Nos enfrentamos a los desafíos más difíciles con creatividad y determinación para encontrar soluciones únicas.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] hover:border-[#8B5CF6]/50 transition-all">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Integridad Inquebrantable</h3>
              <p className="text-[#94A3B8]">
                Nuestra palabra es nuestro compromiso. Actuamos con honestidad radical en cada interacción.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] hover:border-[#8B5CF6]/50 transition-all">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Excelencia Moral</h3>
              <p className="text-[#94A3B8]">
                Tomamos decisiones basadas en principios éticos, no solo en beneficios. Es nuestra brújula hacia el éxito.
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
