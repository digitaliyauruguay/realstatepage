import { useState } from "react";
import { useLocation } from "react-router";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export default function Contact() {
  const location = useLocation();
  const propertyTitle = location.state?.propertyTitle || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: propertyTitle ? `I'm interested in: ${propertyTitle}` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual Airtable API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleWhatsAppClick = () => {
    const message = formData.message || "Hi! I'd like to inquire about your properties.";
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-[#CBD5E1] max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <h2 className="text-2xl font-semibold mb-6 text-[#F8FAFC]">Send us a Message</h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-[#CBD5E1] mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#CBD5E1] mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#CBD5E1] mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#CBD5E1] mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] focus:border-[#8B5CF6] resize-none"
                    placeholder="Tell us about what you're looking for..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white py-6 text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleWhatsAppClick}
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
            {/* Contact Details */}
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <h3 className="text-xl font-semibold mb-6 text-[#F8FAFC]">Contact Information</h3>

              <div className="space-y-6">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#8B5CF6]/20 group-hover:to-[#3B82F6]/20 transition-all">
                    <Phone className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8] mb-1">Phone</div>
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
                    <div className="text-sm text-[#94A3B8] mb-1">Email</div>
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
                    <div className="text-sm text-[#94A3B8] mb-1">Address</div>
                    <div className="text-[#F8FAFC]">{siteConfig.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8] mb-1">Hours</div>
                    <div className="text-[#F8FAFC]">{siteConfig.contact.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp */}
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/10 rounded-2xl p-8 border border-[#25D366]/30">
              <h3 className="text-xl font-semibold mb-4 text-[#F8FAFC]">Instant Response</h3>
              <p className="text-[#CBD5E1] mb-6">
                Need immediate assistance? Chat with us on WhatsApp for instant support.
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
