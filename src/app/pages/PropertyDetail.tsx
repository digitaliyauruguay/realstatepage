import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Bed, Bath, Square, MapPin, Calendar, Car, MessageCircle, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { mockProperties } from "../../data/mockProperties";
import { siteConfig } from "../../config/siteConfig";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#F8FAFC]">Property not found</h2>
          <Link to="/properties">
            <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, operation: string) => {
    if (operation === "rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${property.title} located at ${property.location}. Price: ${formatPrice(property.price, property.operation)}`;
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleScheduleVisit = () => {
    navigate("/contact", { state: { propertyTitle: property.title } });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#8B5CF6] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155]">
              <div className="relative aspect-[16/10]">
                <img
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-0">
                    {property.operation === "buy" ? "For Sale" : "For Rent"}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-[#06B6D4] text-white border-0">Featured</Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-[#8B5CF6]"
                          : "border-transparent hover:border-[#334155]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <h1 className="text-4xl font-bold mb-4 text-[#F8FAFC]">{property.title}</h1>

              <div className="flex items-center gap-2 text-[#94A3B8] mb-6">
                <MapPin className="w-5 h-5 text-[#8B5CF6]" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#334155]">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.area.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.parking} Parking</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Description</h2>
                <p className="text-[#CBD5E1] leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Property Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#8B5CF6]" />
                    <span className="text-[#CBD5E1]">Built in {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 text-[#8B5CF6] flex items-center justify-center">🏠</span>
                    <span className="text-[#CBD5E1] capitalize">{property.type}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-[#0F172A] text-[#8B5CF6] rounded-lg border border-[#8B5CF6]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
              <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Location</h2>
              <div className="bg-[#0F172A] rounded-xl h-64 flex items-center justify-center border border-[#334155]">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#8B5CF6] mx-auto mb-2" />
                  <p className="text-[#94A3B8]">Map integration placeholder</p>
                  <p className="text-sm text-[#64748B]">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] sticky top-24">
              <div className="mb-8">
                <div className="text-sm text-[#94A3B8] mb-2">Price</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                  {formatPrice(property.price, property.operation)}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white py-6 text-lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp Us
                </Button>

                <Button
                  onClick={handleScheduleVisit}
                  className="w-full bg-[#334155] hover:bg-[#475569] text-white py-6 text-lg"
                >
                  Schedule Visit
                </Button>
              </div>

              <div className="pt-8 border-t border-[#334155]">
                <h3 className="font-semibold mb-4 text-[#F8FAFC]">Contact Information</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center gap-3 text-[#CBD5E1] hover:text-[#8B5CF6] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3 text-[#CBD5E1] hover:text-[#8B5CF6] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
