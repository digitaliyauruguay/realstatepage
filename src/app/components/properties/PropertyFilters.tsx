import { filterOptions } from "../../../data/mockProperties";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

interface PropertyFiltersProps {
  filters: {
    type: string;
    operation: string;
    bedrooms: string;
    priceRange: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const priceRanges = filters.operation === "rent"
    ? filterOptions.priceRanges.rent
    : filterOptions.priceRanges.buy;

  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] sticky top-24">
      <h3 className="text-xl font-semibold mb-6 text-[#F8FAFC]">Filtros</h3>

      <div className="space-y-6">
        {/* Operation */}
        <div>
          <Label className="text-[#CBD5E1] mb-2 block">Tipo</Label>
          <Select value={filters.operation} onValueChange={(value) => onFilterChange("operation", value)}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] border-[#334155]">
              {filterOptions.operations.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <Label className="text-[#CBD5E1] mb-2 block">Tipo de Propiedad</Label>
          <Select value={filters.type} onValueChange={(value) => onFilterChange("type", value)}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] border-[#334155]">
              {filterOptions.types.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <Label className="text-[#CBD5E1] mb-2 block">Dormitorios</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => onFilterChange("bedrooms", value)}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] border-[#334155]">
              {filterOptions.bedrooms.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-[#CBD5E1] mb-2 block">Rango de Precio</Label>
          <Select value={filters.priceRange} onValueChange={(value) => onFilterChange("priceRange", value)}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0F172A] border-[#334155]">
              {priceRanges.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-[#F8FAFC]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            onFilterChange("type", "all");
            onFilterChange("operation", "all");
            onFilterChange("bedrooms", "all");
            onFilterChange("priceRange", "all");
          }}
          className="w-full py-2 px-4 bg-[#0F172A] hover:bg-[#334155] text-[#CBD5E1] rounded-lg transition-colors text-sm"
        >
          Restablecer Filtros
        </button>
      </div>
    </div>
  );
}
