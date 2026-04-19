import { Link } from "react-router";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property } from "../../../data/mockProperties";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { siteConfig } from "../../../config/siteConfig";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number, operation: string) => {
    if (operation === "rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
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
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-0">
            {property.operation === "buy" ? "En Venta" : "En Alquiler"}
          </Badge>
          {property.featured && (
            <Badge className="bg-[#06B6D4] text-white border-0">Destacada</Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
            {formatPrice(property.price, property.operation)}
          </span>
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
          <span className="text-sm">{property.location}</span>
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
            <span className="text-sm">{property.area.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#0F172A] text-[#94A3B8] text-xs rounded-md"
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
