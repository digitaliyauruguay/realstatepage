import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Bed, Bath, Square, MapPin, Calendar, Car, MessageCircle, Phone, Mail, ChevronLeft, ChevronRight, Play, Maximize2, X, Grid3x3, Star } from "lucide-react";
import { mockProperties } from "../../data/mockProperties";
import { siteConfig } from "../../config/siteConfig";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import MortgageCalculator from "../components/properties/MortgageCalculator";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const openGallery = (index: number) => {
    setGalleryStartIndex(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
    setShowVideo(false);
    setShowFloorPlan(false);
  };

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleFloorPlanClick = () => {
    setShowFloorPlan(true);
  };

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#F8FAFC]">Propiedad no encontrada</h2>
          <Link to="/properties">
            <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
              Volver a Propiedades
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
          Volver a Propiedades
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Gallery */}
            <div className="relative bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155]">
              <div className="relative aspect-[16/10]">
                {!showVideo && !showFloorPlan && (
                  <img
                    src={property.images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openGallery(currentImageIndex)}
                  />
                )}

                {/* Video Player */}
                {showVideo && property.videoUrl && (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <video
                      controls
                      className="w-full h-full max-h-[600px]"
                      src={property.videoUrl}
                    >
                      <source src={property.videoUrl} type="video/mp4" />
                      Tu navegador no soporta videos.
                    </video>
                  </div>
                )}

                {/* Floor Plan */}
                {showFloorPlan && property.floorPlan && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <img
                      src={property.floorPlan}
                      alt="Plano de la propiedad"
                      className="max-w-full max-h-full object-contain cursor-pointer"
                      onClick={() => openGallery(0)}
                    />
                  </div>
                )}

                {/* Media Controls */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={() => setShowVideo(false)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      !showVideo && !showFloorPlan
                        ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white"
                        : "bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                    }`}
                  >
                    Fotos
                  </button>
                  {property.videoUrl && (
                    <button
                      onClick={handleVideoClick}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        showVideo
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white"
                          : "bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      Video
                    </button>
                  )}
                  {property.floorPlan && (
                    <button
                      onClick={handleFloorPlanClick}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        showFloorPlan
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white"
                          : "bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      }`}
                    >
                      <Maximize2 className="w-3 h-3" />
                      Plano
                    </button>
                  )}
                </div>

                {/* Navigation Buttons */}
                {!showVideo && !showFloorPlan && property.images.length > 1 && (
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

                {/* Image Navigation */}
                {!showVideo && !showFloorPlan && property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white w-8"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Gallery Button */}
                {!showVideo && !showFloorPlan && (
                  <button
                    onClick={() => openGallery(currentImageIndex)}
                    className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-lg px-3 py-2 flex items-center gap-2 transition-all"
                  >
                    <Grid3x3 className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">Ver Galería</span>
                  </button>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 border-t border-[#334155]">
                <div className="flex gap-2 overflow-x-auto">
                  {/* Photos */}
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setShowVideo(false);
                        setShowFloorPlan(false);
                      }}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        !showVideo && !showFloorPlan && index === currentImageIndex
                          ? "border-[#8B5CF6]"
                          : "border-[#334155]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  
                  {/* Video Thumbnail */}
                  {property.videoUrl && (
                    <button
                      onClick={handleVideoClick}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        showVideo ? "border-[#8B5CF6]" : "border-[#334155]"
                      }`}
                    >
                      <div className="w-full h-full bg-black/50 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </button>
                  )}
                  
                  {/* Floor Plan Thumbnail */}
                  {property.floorPlan && (
                    <button
                      onClick={handleFloorPlanClick}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        showFloorPlan ? "border-[#8B5CF6]" : "border-[#334155]"
                      }`}
                    >
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-gray-600" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Full Screen Gallery Modal */}
            {showGallery && (
              <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                <button
                  onClick={closeGallery}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                
                <div className="max-w-6xl max-h-full flex items-center justify-center">
                  <img
                    src={property.images[galleryStartIndex]}
                    alt={`Gallery Image ${galleryStartIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                {/* Gallery Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setGalleryStartIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setGalleryStartIndex((prev) => (prev + 1) % property.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
                
                {/* Gallery Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {galleryStartIndex + 1} / {property.images.length}
                </div>
              </div>
            )}

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
                  <span className="text-[#CBD5E1]">{property.bedrooms} Dorm.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.bathrooms} Baños</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.area.toLocaleString()} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#CBD5E1]">{property.parking} Cochera</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Descripción</h2>
                <p className="text-[#CBD5E1] leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Características de la Propiedad</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#8B5CF6]" />
                    <span className="text-[#CBD5E1]">Construida en {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 text-[#8B5CF6] flex items-center justify-center">??</span>
                    <span className="text-[#CBD5E1] capitalize">{property.type === 'house' ? 'Casa' : 'Departamento'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Cerca de</h2>
                <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                        <span className="text-[#CBD5E1]">{place}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Características Especiales</h2>
                <div className="bg-gradient-to-r from-[#06B6D4]/10 to-[#8B5CF6]/10 rounded-xl p-6 border border-[#06B6D4]/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.specialFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <span className="text-[#CBD5E1] font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Etiquetas</h2>
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
              <h2 className="text-2xl font-semibold mb-4 text-[#F8FAFC]">Ubicación</h2>
              <div className="bg-[#0F172A] rounded-xl h-64 flex items-center justify-center border border-[#334155]">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#8B5CF6] mx-auto mb-2" />
                  <p className="text-[#94A3B8]">Integración de mapa (placeholder)</p>
                  <p className="text-sm text-[#64748B]">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] sticky top-24">
              <div className="mb-8">
                <div className="text-sm text-[#94A3B8] mb-2">Precio</div>
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
                  Escribinos por WhatsApp
                </Button>

                <Button
                  onClick={handleScheduleVisit}
                  className="w-full bg-[#334155] hover:bg-[#475569] text-white py-6 text-lg"
                >
                  Programar Visita
                </Button>
              </div>

              <div className="pt-8 border-t border-[#334155]">
                <h3 className="font-semibold mb-4 text-[#F8FAFC]">Información de Contacto</h3>
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

          {/* Mortgage Calculator */}
          {property.operation === "buy" && (
            <div className="mt-12">
              <MortgageCalculator 
                propertyPrice={property.price} 
                currency={property.currency} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
