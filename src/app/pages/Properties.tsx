import { useState, useMemo } from "react";
import { mockProperties } from "../../data/mockProperties";
import PropertyCard from "../components/properties/PropertyCard";
import PropertyFilters from "../components/properties/PropertyFilters";

export default function Properties() {
  const [filters, setFilters] = useState({
    type: "all",
    operation: "all",
    bedrooms: "all",
    priceRange: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
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

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
            Explorar Propiedades
          </h1>
          <p className="text-[#94A3B8] text-lg">
            Descubrí tu propiedad perfecta de nuestra colección seleccionada
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[#CBD5E1]">
                <span className="font-semibold text-[#8B5CF6]">{filteredProperties.length}</span>{" "}
                {filteredProperties.length === 1 ? "propiedad" : "propiedades"} encontradas
              </p>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-semibold mb-2 text-[#F8FAFC]">
                  No se encontraron propiedades
                </h3>
                <p className="text-[#94A3B8] mb-6">
                  Probá ajustar tus filtros para ver más resultados
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      type: "all",
                      operation: "all",
                      bedrooms: "all",
                      priceRange: "all",
                    });
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white rounded-lg transition-all"
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
