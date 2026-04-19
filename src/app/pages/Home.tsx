import { useState } from "react";
import { Link } from "react-router";
import { Search, ArrowRight, Star, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { mockProperties } from "../../data/mockProperties";
import PropertyCard from "../components/properties/PropertyCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function Home() {
  const featuredProperties = mockProperties.filter((p) => p.featured).slice(0, 3);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, "_blank");
  };

  const handleFormWhatsAppClick = () => {
    const message = formData.message || "¡Hola! Me gustaría consultar sobre sus propiedades.";
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={siteConfig.hero.backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#0F172A]/90 to-[#1E293B]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#8B5CF6]/20 to-[#3B82F6]/20 border border-[#8B5CF6]/30 rounded-full text-[#8B5CF6] text-sm font-medium">
              Plataforma Inmobiliaria Premium
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#F8FAFC] via-[#CBD5E1] to-[#94A3B8] bg-clip-text text-transparent leading-tight">
            {siteConfig.hero.headline}
          </h1>

          <p className="text-xl sm:text-2xl text-[#CBD5E1] mb-12 max-w-3xl mx-auto">
            {siteConfig.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/properties">
              <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 transition-all">
                {siteConfig.hero.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-6 text-lg rounded-xl border border-white/20 transition-all"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {siteConfig.hero.ctaSecondary}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1E293B]/80 backdrop-blur-lg p-4 rounded-2xl border border-[#334155] shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ubicación (ej: Centro, Zona Norte...)"
                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div className="flex-1">
                  <select className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]">
                    <option>Tipo de Propiedad</option>
                    <option>Casa</option>
                    <option>Departamento</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]">
                    <option>Comprar o Alquilar</option>
                    <option>Comprar</option>
                    <option>Alquilar</option>
                  </select>
                </div>
                <Link to="/properties">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white px-8 py-3 rounded-lg">
                    <Search className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#8B5CF6] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#8B5CF6] rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="propiedades" className="py-24 bg-[#020617] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
                Propiedades
              </h2>
              <p className="text-[#94A3B8] text-lg">
                Listados premium seleccionados especialmente para vos
              </p>
            </div>
            <Link to="/properties">
              <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white">
                Ver Todas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="sobre-nosotros" className="py-24 bg-[#0F172A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Sobre Nosotros
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Experimentá la diferencia con nuestros servicios inmobiliarios premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] hover:border-[#8B5CF6]/50 transition-all group hover:shadow-xl hover:shadow-[#8B5CF6]/10"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">
                  {feature.title}
                </h3>
                <p className="text-[#94A3B8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="py-24 bg-[#0F172A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Testimonios
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Historias reales de personas reales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] hover:border-[#8B5CF6]/50 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[#CBD5E1] mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#F8FAFC]">{testimonial.name}</div>
                    <div className="text-sm text-[#94A3B8]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas-frecuentes" className="py-24 bg-[#020617] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Preguntas Frecuentes
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Todo lo que necesitás saber
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {siteConfig.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#1E293B] border border-[#334155] rounded-xl px-6 data-[state=open]:border-[#8B5CF6]/50"
              >
                <AccordionTrigger className="text-left text-[#F8FAFC] hover:text-[#8B5CF6] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#94A3B8] pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-[#020617] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Contacto
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Contactanos hoy y dejá que nuestros expertos te guíen hacia tu hogar perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
                <h3 className="text-2xl font-semibold mb-6 text-[#F8FAFC]">Envianos un Mensaje</h3>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                    ¡Gracias! Tu mensaje fue enviado exitosamente. Nos comunicaremos con vos pronto.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[#CBD5E1] mb-2 block">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6]"
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-[#CBD5E1] mb-2 block">
                        Correo Electrónico *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6]"
                        placeholder="juan@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#CBD5E1] mb-2 block">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6]"
                      placeholder="+598 99 123 456"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#CBD5E1] mb-2 block">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6] resize-none"
                      placeholder="Contanos qué estás buscando..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white py-6 text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>

                    <Button
                      type="button"
                      onClick={handleFormWhatsAppClick}
                      className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 text-lg"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      WhatsApp
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
                <h3 className="text-xl font-semibold mb-6 text-[#F8FAFC]">Información de Contacto</h3>

                <div className="space-y-6">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#8B5CF6]/20 group-hover:to-[#3B82F6]/20 transition-all">
                      <Phone className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#94A3B8] mb-1">Teléfono</div>
                      <div className="text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors">
                        {siteConfig.contact.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#8B5CF6]/20 group-hover:to-[#3B82F6]/20 transition-all">
                      <Mail className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#94A3B8] mb-1">Correo</div>
                      <div className="text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors break-all">
                        {siteConfig.contact.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#94A3B8] mb-1">Dirección</div>
                      <div className="text-[#F8FAFC]">{siteConfig.contact.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#94A3B8] mb-1">Horarios</div>
                      <div className="text-[#F8FAFC]">{siteConfig.contact.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/10 rounded-2xl p-8 border border-[#25D366]/30">
                <h3 className="text-xl font-semibold mb-4 text-[#F8FAFC]">Respuesta Instantánea</h3>
                <p className="text-[#CBD5E1] mb-6">
                  ¿Necesitás ayuda inmediata? Chateá con nosotros por WhatsApp para asistencia al instante.
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Chatear por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
