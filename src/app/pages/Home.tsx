import { Link } from "react-router";
import { Search, ArrowRight, Star, MessageCircle } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { mockProperties } from "../../data/mockProperties";
import PropertyCard from "../components/properties/PropertyCard";
import { Button } from "../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function Home() {
  const featuredProperties = mockProperties.filter((p) => p.featured).slice(0, 3);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, "_blank");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              Premium Real Estate Platform
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
                    placeholder="Location (e.g., Downtown, Westside...)"
                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div className="flex-1">
                  <select className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]">
                    <option>Property Type</option>
                    <option>House</option>
                    <option>Apartment</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]">
                    <option>Buy or Rent</option>
                    <option>Buy</option>
                    <option>Rent</option>
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

      {/* Features Section */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Experience the difference with our premium real estate services
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

      {/* Featured Properties */}
      <section className="py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
                Featured Properties
              </h2>
              <p className="text-[#94A3B8] text-lg">
                Handpicked premium listings just for you
              </p>
            </div>
            <Link to="/properties">
              <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white">
                View All
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

      {/* Testimonials */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Real stories from real people
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
      <section className="py-24 bg-[#020617]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Everything you need to know
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today and let our experts guide you to your perfect home
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-white text-[#8B5CF6] hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-xl"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp Us Now
            </Button>
            <Link to="/contact">
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-6 text-lg rounded-xl border border-white/30">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
