// Site Configuration - Easy customization for different clients
export const siteConfig = {
  // Brand
  brand: {
    name: "LuxeState",
    tagline: "Premium Real Estate Solutions",
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
    headline: "Find Your Ideal Property",
    subheadline: "Buy, rent or invest with confidence in premium locations",
    ctaPrimary: "Explore Properties",
    ctaSecondary: "Contact Us",
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  },

  // Features
  features: [
    {
      icon: "🏡",
      title: "Premium Locations",
      description: "Curated properties in the most desirable neighborhoods",
    },
    {
      icon: "💎",
      title: "Verified Listings",
      description: "Every property is personally inspected and verified",
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Dedicated agents to guide you through every step",
    },
    {
      icon: "📱",
      title: "Instant Contact",
      description: "Reach us anytime via WhatsApp, call, or visit",
    },
  ],

  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      content: "Found my dream home in just 2 weeks! The team was incredibly professional and made the entire process seamless.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      content: "Best real estate investment I've made. The market insights and property analysis were spot-on.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      content: "As a first-time buyer, I was nervous. They guided me through everything and found a perfect starter home within my budget.",
      rating: 5,
    },
  ],

  // FAQ
  faqs: [
    {
      question: "How do I schedule a property visit?",
      answer: "Simply click 'Schedule Visit' on any property listing or contact us via WhatsApp. We'll arrange a convenient time for you within 24 hours.",
    },
    {
      question: "What documents do I need to buy a property?",
      answer: "Typically you'll need proof of identity, proof of income, bank statements, and pre-approval for financing. Our team will guide you through the specific requirements.",
    },
    {
      question: "Can I negotiate the price?",
      answer: "Yes! We encourage negotiation. Our agents will work with you to get the best possible deal while ensuring fair value for both parties.",
    },
    {
      question: "Do you offer financing assistance?",
      answer: "We work with trusted financial partners who can help you secure the best mortgage rates. Our team can connect you with pre-approved lenders.",
    },
    {
      question: "What's the difference between buying and renting?",
      answer: "Buying builds equity but requires upfront investment. Renting offers flexibility with lower initial costs. We can help you decide what's best for your situation.",
    },
    {
      question: "How long does the buying process take?",
      answer: "On average, 30-45 days from offer acceptance to closing. We streamline the process to make it as quick and smooth as possible.",
    },
  ],

  // About Page
  about: {
    headline: "Your Trusted Real Estate Partner",
    description: "With over 15 years of experience in premium real estate, we've helped thousands of clients find their perfect property. Our mission is to make real estate transactions simple, transparent, and rewarding.",
    stats: [
      { value: "15+", label: "Years Experience" },
      { value: "2,500+", label: "Happy Clients" },
      { value: "500+", label: "Properties Sold" },
      { value: "98%", label: "Satisfaction Rate" },
    ],
    team: [
      {
        name: "Alex Thompson",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
        bio: "15+ years in luxury real estate",
      },
      {
        name: "Jessica Martinez",
        role: "Head of Sales",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
        bio: "Expert in residential properties",
      },
      {
        name: "David Kim",
        role: "Investment Advisor",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        bio: "Specializes in commercial real estate",
      },
    ],
  },

  // Navigation
  navigation: {
    main: [
      { name: "Home", path: "/" },
      { name: "Properties", path: "/properties" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    footer: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Careers", path: "/careers" },
    ],
  },

  // SEO
  seo: {
    title: "LuxeState - Premium Real Estate",
    description: "Find your ideal property. Buy, rent or invest with confidence in premium locations.",
    keywords: "real estate, luxury homes, property investment, buy house, rent apartment",
  },
};
