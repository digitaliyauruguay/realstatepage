import { useState } from "react";
import { Search, Filter, X, ChevronDown, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { filterOptions } from "../../../data/mockProperties";

interface FilterState {
  currency: string;
  city: string;
  location: string;
  type: string;
  operation: string;
  bedrooms: string;
  priceRange: string;
  amenities: string[];
  sortBy: string;
  search: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (key: string, value: string | string[]) => void;
  onClearFilters: () => void;
  resultsCount: number;
}

export default function AdvancedFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  resultsCount 
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    if (checked) {
      handleFilterChange("amenities", [...filters.amenities, amenity]);
    } else {
      handleFilterChange(
        "amenities",
        filters.amenities.filter((a) => a !== amenity)
      );
    }
  };

  const getPriceRanges = () => {
    if (filters.operation === "all" || !filters.currency || filters.currency === "all") {
      return [];
    }
    return filterOptions.priceRanges[filters.operation as "buy" | "rent"]?.[filters.currency as "USD" | "UYU"] || [];
  };

  const getCurrencySymbol = () => {
    switch (filters.currency) {
      case "USD":
        return "$";
      case "UYU":
        return "$";
      default:
        return "$";
    }
  };

  const activeFiltersCount = [
    filters.currency !== "all",
    filters.city !== "all",
    filters.location !== "all",
    filters.type !== "all",
    filters.operation !== "all",
    filters.bedrooms !== "all",
    filters.priceRange !== "all",
    filters.amenities.length > 0,
    filters.search !== "",
  ].filter(Boolean).length;

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8B5CF6]/20 rounded-lg">
            <Filter className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#F8FAFC]">Búsqueda Avanzada</h3>
            <p className="text-sm text-[#94A3B8]">
              {resultsCount} propiedades encontradas
              {activeFiltersCount > 0 && ` (${activeFiltersCount} filtros activos)`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="border-[#334155] text-[#94A3B8] hover:bg-[#0F172A] hover:text-[#F8FAFC]"
            >
              <X className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? "Menos filtros" : "Más filtros"}
          </Button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
            Búsqueda por texto
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
            <Input
              placeholder="Buscar por título, descripción..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 bg-[#0F172A] border-[#334155] text-[#F8FAFC] placeholder-[#64748B]"
            />
          </div>
        </div>

        {/* Operation */}
        <div>
          <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
            Operación
          </Label>
          <Select value={filters.operation} onValueChange={(value) => handleFilterChange("operation", value)}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              {filterOptions.operations.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
            Tipo de Propiedad
          </Label>
          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              {filterOptions.types.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 border-t border-[#334155] pt-6">
          {/* Location Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Currency */}
            <div>
              <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
                Moneda
              </Label>
              <Select value={filters.currency} onValueChange={(value) => handleFilterChange("currency", value)}>
                <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-[#334155]">
                  {filterOptions.currencies.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div>
              <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
                Ciudad
              </Label>
              <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
                <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-[#334155]">
                  {filterOptions.cities.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
                Zona/Barrio
              </Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-[#334155]">
                  {filterOptions.locations.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Bedrooms */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
                Rango de Precio
              </Label>
              <Select 
                value={filters.priceRange} 
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                disabled={!filters.currency || filters.currency === "all"}
              >
                <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                  <SelectValue placeholder="Selecciona moneda primero" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-[#334155]">
                  {getPriceRanges().map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div>
              <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
                Dormitorios
              </Label>
              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-[#334155]">
                  {filterOptions.bedrooms.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
                Ordenar por
              </Label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-[#334155]">
                  {filterOptions.sortBy.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-3 block">
              Amenities
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filterOptions.amenities.map((amenity) => (
                <div key={amenity.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.value}
                    checked={filters.amenities.includes(amenity.value)}
                    onCheckedChange={(checked) => handleAmenityToggle(amenity.value, checked as boolean)}
                    className="border-[#334155] data-[state=checked]:bg-[#8B5CF6] data-[state=checked]:border-[#8B5CF6]"
                  />
                  <Label
                    htmlFor={amenity.value}
                    className="text-sm text-[#CBD5E1] cursor-pointer flex items-center gap-2"
                  >
                    <span>{amenity.icon}</span>
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
