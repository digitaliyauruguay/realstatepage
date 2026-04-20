import { Link } from "react-router";
import { Wifi, Car, Home, MapPin, Bed, Bath, Square, Calendar, Video, Image, Star, Play, Maximize2 } from "lucide-react";
import { Property } from "../../../data/mockProperties";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { siteConfig } from "../../../config/siteConfig";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (property: Property) => {
    if (property.operation === "seasonal" && property.seasonalRates) {
      return `Desde $${property.seasonalRates.nightly.toLocaleString()}/noche`;
    } else if (property.operation === "rent") {
      return `$${property.price.toLocaleString()}/mo`;
    } else {
      return `$${property.price.toLocaleString()}`;
    }
  };

  const getOperationLabel = (operation: string) => {
    const labels = {
      buy: "Venta",
      rent: "Alquiler",
      seasonal: "Alquiler por Temporada"
    };
    return labels[operation as keyof typeof labels] || operation;
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, React.ReactNode> = {
      wifi: <Wifi className="w-3 h-3" />,
      airConditioning: <span className="text-xs">❄️</span>,
      pool: <span className="text-xs">🏊</span>,
      garage: <Car className="w-3 h-3" />,
      security: <span className="text-xs">🔒</span>,
      gym: <span className="text-xs">💪</span>,
      terrace: <span className="text-xs">🏞️</span>,
      furnished: <Home className="w-3 h-3" />,
    };
    return icons[amenity] || <span className="text-xs">✓</span>;
  };

  const getTopAmenities = (amenities: typeof property.amenities) => {
    return Object.entries(amenities)
      .filter(([_, has]) => has)
      .map(([key]) => key)
      .slice(0, 4);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hi! I'm interested in ${property.title} located at ${property.location}`;
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="group bg-[#1E293B] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#8B5CF6]/20 transition-all duration-300 border border-[#1E293B] hover:border-[#8B5CF6]/50">
      {/* Image */}
      <Link to={`/property/${property.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Media Indicators */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-0">
            {property.operation === "buy" ? "En Venta" : "En Alquiler"}
          </Badge>
          {property.featured && (
            <Badge className="bg-[#06B6D4] text-white border-0">Destacada</Badge>
          )}
        </div>
        
        <div className="absolute top-4 right-4 flex gap-2">
          {property.videoUrl && (
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
              <Play className="w-3 h-3 text-white" />
              <span className="text-xs text-white">Video</span>
            </div>
          )}
          {property.floorPlan && (
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-white" />
              <span className="text-xs text-white">Plano</span>
            </div>
          )}
        </div>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-xs text-white">{property.images.length} fotos</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
              {formatPrice(property)}
            </span>
            <span className="text-sm text-[#94A3B8] bg-[#0F172A] px-2 py-1 rounded">
              {property.currency}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/property/${property.id}`}>
          <h3 className="text-xl font-semibold mb-2 text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-2 text-[#94A3B8] mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}, {property.city}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#334155]">
          <div className="flex items-center gap-1.5 text-[#CBD5E1]">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#CBD5E1]">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#CBD5E1]">
            <Square className="w-4 h-4" />
            <span className="text-sm">{property.area.toLocaleString()} m²</span>
          </div>
          {property.parking > 0 && (
            <div className="flex items-center gap-1.5 text-[#CBD5E1]">
              <Car className="w-4 h-4" />
              <span className="text-sm">{property.parking}</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {getTopAmenities(property.amenities).map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-1 px-2 py-1 bg-[#0F172A] text-[#94A3B8] text-xs rounded-md"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm font-medium text-[#F8FAFC]">Cerca de:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {property.nearbyPlaces.slice(0, 3).map((place, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs rounded-md border border-[#8B5CF6]/20"
              >
                {place}
              </span>
            ))}
            {property.nearbyPlaces.length > 3 && (
              <span className="px-2 py-1 bg-[#334155] text-[#94A3B8] text-xs rounded-md">
                +{property.nearbyPlaces.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Special Features */}
        {property.specialFeatures.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-sm font-medium text-[#F8FAFC]">Especial:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {property.specialFeatures.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[#06B6D4]/10 text-[#06B6D4] text-xs rounded-md border border-[#06B6D4]/20"
                >
                  {feature}
                </span>
              ))}
              {property.specialFeatures.length > 2 && (
                <span className="px-2 py-1 bg-[#334155] text-[#94A3B8] text-xs rounded-md">
                  +{property.specialFeatures.length - 2} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs rounded-md border border-[#8B5CF6]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/property/${property.id}`} className="flex-1">
            <Button className="w-full bg-[#334155] hover:bg-[#475569] text-white">
              Ver Detalles
            </Button>
          </Link>
          <Button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
