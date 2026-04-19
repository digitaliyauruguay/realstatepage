// Site Configuration - Easy customization for different clients
export const siteConfig = {
  // Brand
  brand: {
    name: "LuxeState",
    tagline: "Soluciones Inmobiliarias Premium",
    logo: "🏢", // Replace with actual logo path
  },

  // Color Scheme
  colors: {
    primary: "#8B5CF6", // Purple
    primaryDark: "#7C3AED",
    secondary: "#3B82F6", // Blue
    secondaryDark: "#2563EB",
    accent: "#06B6D4", // Cyan
    background: {
      dark: "#0F172A", // Deep navy
      darker: "#020617", // Almost black
      card: "#1E293B", // Dark gray
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
      muted: "#94A3B8",
    },
  },

  // Contact Information
  contact: {
    phone: "+1 (555) 123-4567",
    whatsapp: "+15551234567", // Format: country code + number (no spaces or symbols)
    email: "contact@luxestate.com",
    address: "123 Luxury Avenue, Metropolitan City, MC 12345",
    hours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM",
  },

  // Social Media
  social: {
    facebook: "https://facebook.com/luxestate",
    instagram: "https://instagram.com/luxestate",
    twitter: "https://twitter.com/luxestate",
    linkedin: "https://linkedin.com/company/luxestate",
  },

  // Hero Section
  hero: {
    headline: "Encontrá tu Propiedad Ideal",
    subheadline: "Comprá, alquilá o invertí con confianza en las mejores ubicaciones",
    ctaPrimary: "Explorar Propiedades",
    ctaSecondary: "Contactanos",
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  },

  // Features
  features: [
    {
      icon: "🏡",
      title: "Ubicaciones Premium",
      description: "Propiedades seleccionadas en los mejores barrios",
    },
    {
      icon: "💎",
      title: "Listados Verificados",
      description: "Cada propiedad es inspeccionada y verificada personalmente",
    },
    {
      icon: "🤝",
      title: "Asesoramiento Experto",
      description: "Agentes dedicados para guiarte en cada paso",
    },
    {
      icon: "📱",
      title: "Contacto Instantáneo",
      description: "Contactanos en cualquier momento vía WhatsApp, llamada o visita",
    },
  ],

  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "María González",
      role: "Propietaria",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      content: "¡Encontré la casa de mis sueños en solo 2 semanas! El equipo fue increíblemente profesional y hizo todo el proceso muy sencillo.",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Mendez",
      role: "Inversor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      content: "La mejor inversión inmobiliaria que he hecho. Los análisis del mercado y de propiedades fueron exactos.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      role: "Compradora por Primera Vez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      content: "Como compradora primera vez, estaba nerviosa. Me guiaron en todo y encontraron la casa perfecta dentro de mi presupuesto.",
      rating: 5,
    },
  ],

  // FAQ
  faqs: [
    {
      question: "¿Cómo programo una visita a una propiedad?",
      answer: "Simplemente hacé clic en 'Programar Visita' en cualquier listado de propiedad o contactanos por WhatsApp. Coordinaremos un horario conveniente para vos dentro de las 24 horas.",
    },
    {
      question: "¿Qué documentos necesito para comprar una propiedad?",
      answer: "Típicamente necesitarás prueba de identidad, comprobante de ingresos, estados de cuenta bancarios y pre-aprobación de financiación. Nuestro equipo te guiará a través de los requisitos específicos.",
    },
    {
      question: "¿Puedo negociar el precio?",
      answer: "¡Sí! Fomentamos la negociación. Nuestros agentes trabajarán con vos para obtener el mejor trato posible mientras aseguran un valor justo para ambas partes.",
    },
    {
      question: "¿Ofrecen asistencia con financiación?",
      answer: "Trabajamos con socios financieros de confianza que pueden ayudarte a obtener las mejores tasas hipotecarias. Nuestro equipo puede conectarte con prestamistas pre-aprobados.",
    },
    {
      question: "¿Cuál es la diferencia entre comprar y alquilar?",
      answer: "Comprar genera patrimonio pero requiere inversión inicial. Alquilar ofrece flexibilidad con costos iniciales más bajos. Podemos ayudarte a decidir qué es mejor para tu situación.",
    },
    {
      question: "¿Cuánto tiempo toma el proceso de compra?",
      answer: "En promedio, de 30 a 45 días desde la aceptación de la oferta hasta el cierre. Agilizamos el proceso para que sea lo más rápido y fluido posible.",
    },
  ],

  // About Page
  about: {
    headline: "Tu Socio Inmobiliario de Confianza",
    description: "Con más de 15 años de experiencia en bienes raíces premium, hemos ayudado a miles de clientes a encontrar su propiedad perfecta. Nuestra misión es hacer que las transacciones inmobiliarias sean simples, transparentes y gratificantes.",
    stats: [
      { value: "15+", label: "Años de Experiencia" },
      { value: "2,500+", label: "Clientes Felices" },
      { value: "500+", label: "Propiedades Vendidas" },
      { value: "98%", label: "Tasa de Satisfacción" },
    ],
    team: [
      {
        name: "Alejandro Torres",
        role: "Fundador y CEO",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
        bio: "15+ años en bienes raíces de lujo",
      },
      {
        name: "Jessica Martínez",
        role: "Jefa de Ventas",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
        bio: "Experta en propiedades residenciales",
      },
      {
        name: "David Pérez",
        role: "Asesor de Inversiones",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        bio: "Especialista en bienes raíces comerciales",
      },
    ],
  },

  // Navigation
  navigation: {
    main: [
      { name: "Inicio", path: "/" },
      { name: "Propiedades", path: "/properties" },
      { name: "Sobre Nosotros", path: "/about" },
      { name: "Testimonios", path: "/testimonials" },
      { name: "Preguntas Frecuentes", path: "/faq" },
      { name: "Contacto", path: "/contact" },
    ],
    footer: [
      { name: "Política de Privacidad", path: "/privacy" },
      { name: "Términos de Servicio", path: "/terms" },
      { name: "Carreras", path: "/careers" },
    ],
  },

  // SEO
  seo: {
    title: "LuxeState - Bienes Raíces Premium",
    description: "Encontrá tu propiedad ideal. Comprá, alquilá o invertí con confianza en ubicaciones premium.",
    keywords: "bienes raíces, casas de lujo, inversión inmobiliaria, comprar casa, alquilar departamento",
  },
};
