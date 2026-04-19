// Mock property data - Ready to connect to Airtable
// Airtable Schema:
// Table: Properties
// Fields: id, title, description, price, location, bedrooms, bathrooms, area, type, operation, featured, images[], tags[]

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "house" | "apartment";
  operation: "buy" | "rent";
  featured: boolean;
  images: string[];
  tags: string[];
  yearBuilt: number;
  parking: number;
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Penthouse",
    description: "Stunning penthouse with panoramic city views, floor-to-ceiling windows, and premium finishes throughout. Features a gourmet kitchen, spa-like bathrooms, and a private rooftop terrace.",
    price: 2850000,
    location: "Downtown Metropolitan",
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    type: "apartment",
    operation: "buy",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    ],
    tags: ["luxury", "city view", "rooftop"],
    yearBuilt: 2023,
    parking: 2,
  },
  {
    id: "2",
    title: "Luxury Suburban Villa",
    description: "Elegant 5-bedroom villa in a gated community. Features include a pool, home theater, wine cellar, and beautifully landscaped gardens.",
    price: 8500,
    location: "Westside Estates",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    type: "house",
    operation: "rent",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
    ],
    tags: ["pool", "gated", "garden"],
    yearBuilt: 2021,
    parking: 3,
  },
  {
    id: "3",
    title: "Beachfront Condo",
    description: "Wake up to ocean views in this beautifully renovated beachfront condo. Open concept living with high-end appliances and coastal design.",
    price: 1650000,
    location: "Seaside Boulevard",
    bedrooms: 2,
    bathrooms: 2,
    area: 1600,
    type: "apartment",
    operation: "buy",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
    ],
    tags: ["beach", "ocean view", "renovated"],
    yearBuilt: 2019,
    parking: 1,
  },
  {
    id: "4",
    title: "Contemporary Loft Studio",
    description: "Industrial-chic loft in a converted warehouse. High ceilings, exposed brick, and modern amenities. Perfect for young professionals.",
    price: 3200,
    location: "Arts District",
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    type: "apartment",
    operation: "rent",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    tags: ["loft", "modern", "downtown"],
    yearBuilt: 2020,
    parking: 1,
  },
  {
    id: "5",
    title: "Family Estate with Pool",
    description: "Spacious family home with a large backyard, pool, and outdoor entertainment area. Perfect for growing families.",
    price: 1250000,
    location: "Oak Valley",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: "house",
    operation: "buy",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    tags: ["pool", "family-friendly", "backyard"],
    yearBuilt: 2018,
    parking: 2,
  },
  {
    id: "6",
    title: "Mountain View Retreat",
    description: "Serene mountain retreat with breathtaking views. Features wood finishes, stone fireplace, and wraparound deck.",
    price: 6500,
    location: "Highland Ridge",
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    type: "house",
    operation: "rent",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
    ],
    tags: ["mountain view", "fireplace", "nature"],
    yearBuilt: 2017,
    parking: 2,
  },
  {
    id: "7",
    title: "Smart City Apartment",
    description: "Fully automated smart home with voice control, automated blinds, and security system. Modern design in a prime location.",
    price: 895000,
    location: "Tech Quarter",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    type: "apartment",
    operation: "buy",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    tags: ["smart home", "modern", "tech"],
    yearBuilt: 2024,
    parking: 1,
  },
  {
    id: "8",
    title: "Historic Brownstone",
    description: "Beautifully preserved brownstone with original details. Hardwood floors, crown molding, and a private garden.",
    price: 4800,
    location: "Heritage District",
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    type: "house",
    operation: "rent",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    tags: ["historic", "garden", "character"],
    yearBuilt: 1925,
    parking: 1,
  },
  {
    id: "9",
    title: "Golf Course Mansion",
    description: "Prestigious estate on the 18th hole. Custom built with imported materials, wine cellar, and infinity pool.",
    price: 4950000,
    location: "Country Club Estates",
    bedrooms: 6,
    bathrooms: 5,
    area: 6500,
    type: "house",
    operation: "buy",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80",
    ],
    tags: ["luxury", "golf course", "estate"],
    yearBuilt: 2022,
    parking: 4,
  },
];

// Filter options for UI
export const filterOptions = {
  types: [
    { value: "all", label: "All Types" },
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
  ],
  operations: [
    { value: "all", label: "All" },
    { value: "buy", label: "Buy" },
    { value: "rent", label: "Rent" },
  ],
  bedrooms: [
    { value: "all", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ],
  priceRanges: {
    buy: [
      { value: "all", label: "Any Price" },
      { value: "0-500000", label: "Under $500K" },
      { value: "500000-1000000", label: "$500K - $1M" },
      { value: "1000000-2000000", label: "$1M - $2M" },
      { value: "2000000-5000000", label: "$2M - $5M" },
      { value: "5000000-99999999", label: "$5M+" },
    ],
    rent: [
      { value: "all", label: "Any Price" },
      { value: "0-3000", label: "Under $3K" },
      { value: "3000-5000", label: "$3K - $5K" },
      { value: "5000-7000", label: "$5K - $7K" },
      { value: "7000-10000", label: "$7K - $10K" },
      { value: "10000-99999999", label: "$10K+" },
    ],
  },
};
