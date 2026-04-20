import { useState, useMemo, useEffect } from "react";
import { mockProperties } from "../../data/mockProperties";
import PropertyCard from "../components/properties/PropertyCard";
import AdvancedFilters from "../components/properties/AdvancedFilters";

export default function Properties() {
  const [filters, setFilters] = useState({
    currency: "all",
    city: "all",
    location: "all",
    type: "all",
    operation: "all",
    bedrooms: "all",
    priceRange: "all",
    amenities: [],
    sortBy: "featured",
    search: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      currency: "all",
      city: "all",
      location: "all",
      type: "all",
      operation: "all",
      bedrooms: "all",
      priceRange: "all",
      amenities: [],
      sortBy: "featured",
      search: "",
    });
  };

  const filteredProperties = useMemo(() => {
    return mockProperties
      .filter((property) => {
        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          if (
            !property.title.toLowerCase().includes(searchLower) &&
            !property.description.toLowerCase().includes(searchLower) &&
            !property.location.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
        }

        // Currency filter
        if (filters.currency !== "all" && property.currency !== filters.currency) {
          return false;
        }

        // City filter
        if (filters.city !== "all" && property.city !== filters.city) {
          return false;
        }

        // Location filter
        if (filters.location !== "all" && property.location !== filters.location) {
          return false;
        }

        // Type filter
        if (filters.type !== "all" && property.type !== filters.type) {
          return false;
        }

        // Operation filter
        if (filters.operation !== "all" && property.operation !== filters.operation) {
          return false;
        }

        // Bedrooms filter
        if (filters.bedrooms !== "all") {
          const minBedrooms = parseInt(filters.bedrooms);
          if (property.bedrooms < minBedrooms) {
            return false;
          }
        }

        // Price range filter
        if (filters.priceRange !== "all") {
          const [min, max] = filters.priceRange.split("-").map(Number);
          if (property.price < min || property.price > max) {
            return false;
          }
        }

        // Amenities filter
        if (filters.amenities.length > 0) {
          const hasAllAmenities = filters.amenities.every((amenity) => 
            property.amenities[amenity as keyof typeof property.amenities]
          );
          if (!hasAllAmenities) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case "size-asc":
            return a.area - b.area;
          case "size-desc":
            return b.area - a.area;
          case "featured":
          default:
            // Featured properties first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [filters]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-12 transition-all duration-1000 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
            Todas las Propiedades
          </h1>
          <p className="text-[#94A3B8] text-lg">
            Descubrí tu propiedad perfecta de nuestra colección seleccionada
          </p>
        </div>

        {/* Advanced Filters */}
        <div className={`transition-all duration-1000 delay-300 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <AdvancedFilters 
            filters={filters} 
            onFiltersChange={handleFilterChange} 
            onClearFilters={handleClearFilters}
            resultsCount={filteredProperties.length}
          />
        </div>

        {/* Properties Grid */}
        <div className={`transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
            {/* Results Count */}
            <div className={`mb-6 flex items-center justify-between transition-all duration-1000 delay-700 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-[#CBD5E1]">
                <span className="font-semibold text-[#8B5CF6]">{filteredProperties.length}</span>{" "}
                {filteredProperties.length === 1 ? "propiedad" : "propiedades"} encontradas
              </p>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-1000 delay-900 transform ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="transition-all duration-700 transform"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isLoaded ? 'fadeInUp 0.7s ease-out forwards' : 'none'
                    }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-20 transition-all duration-1000 delay-900 transform ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-6xl mb-4">🏠</div>
                <p className="text-xl text-[#94A3B8] mb-4">
                  No se encontraron propiedades que coincidan con tu búsqueda.
                </p>
                <p className="text-[#94A3B8]">
                  Intentá ajustar los filtros o contactanos para ayuda personalizada.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white rounded-lg transition-all"
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
