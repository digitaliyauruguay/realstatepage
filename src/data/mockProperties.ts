// Mock property data - Ready to connect to Airtable
// Airtable Schema:
// Table: Properties
// Fields: id, title, description, price, location, bedrooms, bathrooms, area, type, operation, featured, images[], tags[]

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "USD" | "UYU";
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "house" | "apartment";
  operation: "buy" | "rent" | "seasonal";
  featured: boolean;
  images: string[];
  tags: string[];
  yearBuilt: number;
  parking: number;
  amenities: {
    wifi: boolean;
    airConditioning: boolean;
    pool: boolean;
    garage: boolean;
    security: boolean;
    gym: boolean;
    terrace: boolean;
    furnished: boolean;
  };
  createdAt: string;
  videoUrl?: string;
  floorPlan?: string;
  nearbyPlaces: string[];
  specialFeatures: string[];
  seasonalRates?: {
    nightly: number;
    weekly: number;
    monthly: number;
    minStay: number;
    maxStay: number;
    cleaningFee: number;
    securityDeposit: number;
  };
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Penthouse de Lujo en Pocitos",
    description: "Espectacular penthouse con vistas panorámicas a la Rambla, ventanas de piso a techo y acabados premium. Cuenta con cocina gourmet, baños tipo spa y terraza rooftop privada.",
    price: 2850000,
    currency: "USD",
    location: "Pocitos",
    city: "Montevideo",
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
    tags: ["lujo", "vista mar", "rooftop"],
    yearBuilt: 2023,
    parking: 2,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: true,
      garage: true,
      security: true,
      gym: true,
      terrace: true,
      furnished: true,
    },
    createdAt: "2024-01-15",
    videoUrl: "https://example.com/video1.mp4",
    floorPlan: "https://example.com/floorplan1.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 21)", "Shopping Montevideo", "Hospital Español", "Plaza Pocitos", "Rambla de Pocitos", "Supermercado Devoto"],
    specialFeatures: ["Sótano con bodega privada", "Armarios empotrados de cedro", "Sistema de domótica completo", "Terraza con jacuzzi privado", "Cocina con isla central", "Ventanas de piso a techo"]
  },
  {
    id: "2",
    title: "Villa de Lujo en Punta del Este",
    description: "Elegante villa de 5 habitaciones en comunidad privada. Incluye piscina, cine en casa, bodega y jardines paisajistas.",
    price: 8500,
    currency: "USD",
    location: "San Rafael",
    city: "Punta del Este",
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
    tags: ["piscina", "privado", "jardín"],
    yearBuilt: 2021,
    parking: 3,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: true,
      garage: true,
      security: true,
      gym: true,
      terrace: true,
      furnished: true,
    },
    createdAt: "2024-02-20",
    videoUrl: "https://example.com/video2.mp4",
    floorPlan: "https://example.com/floorplan2.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 40)", "Shopping Punta Shopping", "Sanatorio Cantegril", "Playa Mansa", "Puerto de Punta del Este", "Gimnasio Sport Club"],
    specialFeatures: ["Casa de árboles en jardín", "Piscina infinita con cascada", "Cine en casa con 8 asientos", "Bodega climatizada para 500 botellas", "Sauna finlandés", "Helipuerto privado"]
  },
  {
    id: "3",
    title: "Apartamento Frente al Mar",
    description: "Despierta con vistas al oceano en este apartamento renovado. Concepto abierto con electrodomésticos premium y diseño costero.",
    price: 1650000,
    currency: "USD",
    location: "La Barra",
    city: "Punta del Este",
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
    tags: ["playa", "vista mar", "renovado"],
    yearBuilt: 2019,
    parking: 1,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: false,
      garage: true,
      security: true,
      gym: false,
      terrace: true,
      furnished: false,
    },
    createdAt: "2024-01-20",
    videoUrl: "https://example.com/video3.mp4",
    floorPlan: "https://example.com/floorplan3.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 18)", "Shopping Tres Cruces", "Hospital Maciel", "Plaza Independencia", "Teatro Solís", "Mercado del Puerto"],
    specialFeatures: ["Techo alto de 6 metros", "Pisos de madera original", "Chimenea de piedra", "Balcones franceses", "Escalera caracol de hierro forjado", "Vistas al Río de la Plata"]
  },
  {
    id: "4",
    title: "Loft Moderno en Ciudad Vieja",
    description: "Loft industrial-chic en edificio histórico. Techos altos, ladrillo expuesto y amenities modernos. Perfecto para profesionales jóvenes.",
    price: 3200,
    currency: "USD",
    location: "Ciudad Vieja",
    city: "Montevideo",
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
    tags: ["loft", "moderno", "centro"],
    yearBuilt: 2020,
    parking: 1,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: false,
      garage: false,
      security: true,
      gym: false,
      terrace: true,
      furnished: false,
    },
    createdAt: "2024-03-05",
    videoUrl: "https://example.com/video4.mp4",
    floorPlan: "https://example.com/floorplan4.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 12)", "Shopping Villa Biarritz", "Cementerio del Buceo", "Rambla del Buceo", "Puerto de Montevideo", "Club de Golf del Uruguay"],
    specialFeatures: ["Muros de ladrillo expuesto", "Vigas de metal industriales", "Diseño loft abierto", "Baño con ducha de lluvia", "Cocina industrial", "Acceso privado al techo"],
    seasonalRates: {
      nightly: 120,
      weekly: 800,
      monthly: 2500,
      minStay: 2,
      maxStay: 14,
      cleaningFee: 100,
      securityDeposit: 300
    }
  },
  {
    id: "5",
    title: "Casa Familiar con Piscina",
    description: "Amplia casa familiar con patio grande, piscina y área de entretenimiento exterior. Perfecta para familias en crecimiento.",
    price: 1250000,
    currency: "USD",
    location: "Carrasco",
    city: "Montevideo",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: "house",
    operation: "buy",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b026?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    tags: ["piscina", "familiar", "patio"],
    yearBuilt: 2018,
    parking: 2,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: true,
      garage: true,
      security: true,
      gym: false,
      terrace: true,
      furnished: false,
    },
    createdAt: "2024-01-30",
    videoUrl: "https://example.com/video9.mp4",
    floorPlan: "https://example.com/floorplan9.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 9)", "Shopping Malvín", "Hospital San Juan de Dios", "Playa Malvín", "Rambla de Montevideo", "Country Club Malvín"],
    specialFeatures: ["Piscina con sistema de sal", "Jardín zen con koi pond", "Sala de juegos infantil", "Barbacoa cubierta", "Sistema de riego automatizado", "Cuarto de juegos con murales"]
  },
  {
    id: "6",
    title: "Casa en Colonia del Sacramento",
    description: "Retiro sereno con vistas impresionantes. Acabados en madera, chimenea de piedra y deck circundante.",
    price: 6500,
    currency: "USD",
    location: "Barrio Histórico",
    city: "Colonia del Sacramento",
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
    tags: ["histórico", "chimenea", "naturaleza"],
    yearBuilt: 2017,
    parking: 2,
    amenities: {
      wifi: true,
      airConditioning: false,
      pool: false,
      garage: true,
      security: false,
      gym: false,
      terrace: true,
      furnished: true,
    },
    createdAt: "2024-01-30",
    videoUrl: "https://example.com/video6.mp4",
    floorPlan: "https://example.com/floorplan6.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 1)", "Shopping Colonia", "Hospital Colonia", "Plaza Mayor", "Iglesia Matriz", "Museo Portugués"],
    specialFeatures: ["Paredes de piedra histórica", "Techos de tejas coloniales", "Hogón a leña", "Patio colonial con fuente", "Ventanas con rejas forjadas", "Sótano con bodega de vinos"]
  },
  {
    id: "7",
    title: "Apartamento Smart Home",
    description: "Hogar inteligente totalmente automatizado con control por voz, persianas automáticas y sistema de seguridad. Diseño moderno en ubicación premium.",
    price: 895000,
    currency: "USD",
    location: "Parque Rodó",
    city: "Montevideo",
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
    tags: ["smart home", "moderno", "tecnología"],
    yearBuilt: 2024,
    parking: 1,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: false,
      garage: true,
      security: true,
      gym: true,
      terrace: false,
      furnished: true,
    },
    createdAt: "2024-04-01",
    videoUrl: "https://example.com/video7.mp4",
    floorPlan: "https://example.com/floorplan7.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 3)", "Shopping Punta del Este", "Sanatorio Mautone", "Playa Brava", "Conrad Punta del Este", "Yacht Club Punta del Este"],
    specialFeatures: ["Jacuzzi con vista al mar", "Terraza solarium", "Armarios walk-in con iluminación", "Cocina con isla de mármol", "Sistema de aire centralizado", "Acceso directo a la playa"],
    seasonalRates: {
      nightly: 250,
      weekly: 1750,
      monthly: 5000,
      minStay: 2,
      maxStay: 21,
      cleaningFee: 200,
      securityDeposit: 750
    }
  },
  {
    id: "8",
    title: "Casa Histórica en Prado",
    description: "Hermosa casa histórica preservada con detalles originales. Pisos de madera, molduras y jardín privado.",
    price: 4800,
    currency: "USD",
    location: "Prado",
    city: "Montevideo",
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
    tags: ["histórico", "jardín", "carácter"],
    yearBuilt: 1925,
    parking: 1,
    amenities: {
      wifi: true,
      airConditioning: false,
      pool: false,
      garage: true,
      security: false,
      gym: false,
      terrace: true,
      furnished: false,
    },
    createdAt: "2024-02-20",
    videoUrl: "https://example.com/video8.mp4",
    floorPlan: "https://example.com/floorplan8.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 15)", "Shopping Paseo", "Hospital Pereira Rossell", "Parque Prado", "Hipódromo de Maroñas", "Jardín Botánico"],
    specialFeatures: ["Biblioteca personal con 2000 libros", "Taller de arte con luz norte", "Jardín de invierno", "Galería de arte privada", "Piano de cola Steinway", "Sala de música acústica"]
  },
  {
    id: "9",
    title: "Penthouse con Rooftop",
    description: "Penthouse exclusivo con terraza rooftop privada, jacuzzi y vistas 360 grados de la ciudad.",
    price: 2100000,
    currency: "USD",
    location: "Parque Rodó",
    city: "Montevideo",
    bedrooms: 3,
    bathrooms: 3,
    area: 2600,
    type: "apartment",
    operation: "buy",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    ],
    tags: ["rooftop", "jacuzzi", "360°"],
    yearBuilt: 2022,
    parking: 2,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: true,
      garage: true,
      security: true,
      gym: true,
      terrace: true,
      furnished: true,
    },
    createdAt: "2024-03-15",
    videoUrl: "https://example.com/video9.mp4",
    floorPlan: "https://example.com/floorplan9.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea 11)", "Shopping World Trade Center", "Hospital Británico", "Plaza Fabini", "Teatro Uruguay", "Intendencia de Montevideo"],
    specialFeatures: ["Rooftop con 360° vistas", "Jacuzzi climatizado", "Barra exterior con nevera", "Sistema de audio exterior", "Zona de lounge con chimenea", "Domo telescópico"]
  },
  {
    id: "10",
    title: "Casa de Playa en La Paloma",
    description: "Casa frente al mar con acceso directo a la playa. Ideal para vacaciones y fines de semana.",
    price: 7200,
    currency: "USD",
    location: "La Paloma",
    city: "Rocha",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: "house",
    operation: "seasonal",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    tags: ["playa", "vacaciones", "frente al mar"],
    yearBuilt: 2019,
    parking: 2,
    amenities: {
      wifi: true,
      airConditioning: true,
      pool: false,
      garage: true,
      security: true,
      gym: false,
      terrace: true,
      furnished: true,
    },
    createdAt: "2024-01-10",
    videoUrl: "https://example.com/video10.mp4",
    floorPlan: "https://example.com/floorplan10.jpg",
    nearbyPlaces: ["Parada de ómnibus (línea RUTA)", "Supermercado La Paloma", "Centro de Salud La Paloma", "Playa La Balconada", "Faro de La Paloma", "Restaurante El Emir"],
    specialFeatures: ["Acceso privado a playa", "Mirador con telescopio", "Terraza con hamacas", "Parrilla de piedra", "Ducha exterior con agua caliente", "Almacén para equipos de playa"],
    seasonalRates: {
      nightly: 180,
      weekly: 1200,
      monthly: 3500,
      minStay: 3,
      maxStay: 30,
      cleaningFee: 150,
      securityDeposit: 500
    }
  }
];

// Filter options for UI
export const filterOptions = {
  currencies: [
    { value: "all", label: "Todas las Monedas" },
    { value: "USD", label: "USD" },
    { value: "UYU", label: "UYU" },
  ],
  cities: [
    { value: "all", label: "Todas las Ciudades" },
    { value: "Montevideo", label: "Montevideo" },
    { value: "Punta del Este", label: "Punta del Este" },
    { value: "Colonia del Sacramento", label: "Colonia del Sacramento" },
    { value: "Maldonado", label: "Maldonado" },
    { value: "Canelones", label: "Canelones" },
    { value: "Rocha", label: "Rocha" },
  ],
  locations: [
    { value: "all", label: "Todas las Zonas" },
    { value: "Pocitos", label: "Pocitos" },
    { value: "Ciudad Vieja", label: "Ciudad Vieja" },
    { value: "Carrasco", label: "Carrasco" },
    { value: "Parque Rodó", label: "Parque Rodó" },
    { value: "Prado", label: "Prado" },
    { value: "Punta del Este", label: "Punta del Este" },
    { value: "La Barra", label: "La Barra" },
    { value: "San Rafael", label: "San Rafael" },
    { value: "Cantegril", label: "Cantegril" },
    { value: "Barrio Histórico", label: "Barrio Histórico" },
  ],
  types: [
    { value: "all", label: "Todos los Tipos" },
    { value: "house", label: "Casa" },
    { value: "apartment", label: "Departamento" },
  ],
  operations: [
    { value: "all", label: "Todos" },
    { value: "buy", label: "Comprar" },
    { value: "rent", label: "Alquilar" },
    { value: "seasonal", label: "Alquiler por Temporada" },
  ],
  bedrooms: [
    { value: "all", label: "Cualquiera" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ],
  priceRanges: {
    buy: {
      USD: [
        { value: "all", label: "Cualquier Precio" },
        { value: "0-500000", label: "Menos de $500K" },
        { value: "500000-1000000", label: "$500K - $1M" },
        { value: "1000000-2000000", label: "$1M - $2M" },
        { value: "2000000-5000000", label: "$2M - $5M" },
        { value: "5000000-99999999", label: "$5M+" },
      ],
      UYU: [
        { value: "all", label: "Cualquier Precio" },
        { value: "0-20000000", label: "Menos de $20M" },
        { value: "20000000-40000000", label: "$20M - $40M" },
        { value: "40000000-80000000", label: "$40M - $80M" },
        { value: "80000000-150000000", label: "$80M - $150M" },
        { value: "150000000-999999999", label: "$150M+" },
      ],
    },
    rent: {
      USD: [
        { value: "all", label: "Cualquier Precio" },
        { value: "0-3000", label: "Menos de $3K" },
        { value: "3000-5000", label: "$3K - $5K" },
        { value: "5000-7000", label: "$5K - $7K" },
        { value: "7000-10000", label: "$7K - $10K" },
        { value: "10000-99999999", label: "$10K+" },
      ],
      UYU: [
        { value: "all", label: "Cualquier Precio" },
        { value: "0-120000", label: "Menos de $120K" },
        { value: "120000-200000", label: "$120K - $200K" },
        { value: "200000-280000", label: "$200K - $280K" },
        { value: "280000-400000", label: "$280K - $400K" },
        { value: "400000-999999999", label: "$400K+" },
      ],
    },
  },
  amenities: [
    { value: "wifi", label: "WiFi", icon: "📶" },
    { value: "airConditioning", label: "Aire Acondicionado", icon: "❄️" },
    { value: "pool", label: "Piscina", icon: "🏊" },
    { value: "garage", label: "Garage", icon: "🚗" },
    { value: "security", label: "Seguridad", icon: "🔒" },
    { value: "gym", label: "Gimnasio", icon: "💪" },
    { value: "terrace", label: "Terraza", icon: "🏞️" },
    { value: "furnished", label: "Amueblado", icon: "🛋️" },
  ],
  sortBy: [
    { value: "featured", label: "Destacados" },
    { value: "price-asc", label: "Precio: Menor a Mayor" },
    { value: "price-desc", label: "Precio: Mayor a Menor" },
    { value: "newest", label: "Más Nuevos" },
    { value: "size-asc", label: "Tamaño: Menor a Mayor" },
    { value: "size-desc", label: "Tamaño: Mayor a Menor" },
  ],
};
