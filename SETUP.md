# LuxeState - Premium Real Estate Platform

A modern, high-converting real estate website built with React, Vite, React Router, and Tailwind CSS v4.

## 🎨 Features

- **Dark Theme**: Deep navy, black, and dark gray with purple/blue gradient accents
- **Fully Responsive**: Mobile-first design that works on all devices
- **Config-Driven**: Easy customization via single config file
- **Property Management**: Browse, filter, and view detailed property listings
- **Contact Integration**: WhatsApp, phone, email, and contact form
- **Premium UI**: Smooth animations, modern design, high conversion focus
- **SEO Ready**: Optimized meta tags and semantic HTML

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, RootLayout
│   │   ├── properties/      # PropertyCard, PropertyFilters
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Home, Properties, PropertyDetail, About, Contact
│   ├── routes.tsx          # React Router configuration
│   └── App.tsx             # Main app component
├── config/
│   └── siteConfig.ts       # 🔧 CUSTOMIZE HERE - All site settings
├── data/
│   └── mockProperties.ts   # Property data (ready for Airtable)
└── styles/                 # Tailwind and theme styles
```

## 🔧 Customization Guide

### 1. Site Configuration (`src/config/siteConfig.ts`)

This is your one-stop file for ALL customization:

#### Brand Settings
```typescript
brand: {
  name: "LuxeState",           // Change company name
  tagline: "Premium Real Estate Solutions",
  logo: "🏢",                  // Replace with logo path
}
```

#### Color Scheme
```typescript
colors: {
  primary: "#8B5CF6",          // Purple - change to brand color
  secondary: "#3B82F6",        // Blue - change to brand color
  accent: "#06B6D4",           // Cyan accent
  // ... all colors customizable
}
```

#### Contact Information
```typescript
contact: {
  phone: "+1 (555) 123-4567",
  whatsapp: "+15551234567",    // WhatsApp number (no spaces/symbols)
  email: "contact@luxestate.com",
  address: "123 Luxury Avenue...",
  hours: "Mon-Sat: 9AM-7PM...",
}
```

#### Content
- Hero headlines and CTAs
- Features list
- Testimonials
- FAQ items
- About page content
- Team members
- Navigation links

### 2. Property Data (`src/data/mockProperties.ts`)

Currently using mock data. Ready to connect to Airtable.

#### Airtable Schema
Create a table named **Properties** with these fields:

| Field Name  | Type          | Description                    |
|-------------|---------------|--------------------------------|
| id          | Text          | Unique identifier              |
| title       | Text          | Property title                 |
| description | Long Text     | Full description               |
| price       | Number        | Price (USD)                    |
| location    | Text          | Property location              |
| bedrooms    | Number        | Number of bedrooms             |
| bathrooms   | Number        | Number of bathrooms            |
| area        | Number        | Square footage                 |
| type        | Single Select | house, apartment               |
| operation   | Single Select | buy, rent                      |
| featured    | Checkbox      | Featured property?             |
| images      | Attachment    | Property images                |
| tags        | Multiple Tags | Property tags                  |
| yearBuilt   | Number        | Year built                     |
| parking     | Number        | Parking spaces                 |

#### Connecting to Airtable

1. Install Airtable SDK:
```bash
pnpm add airtable
```

2. Create `.env` file:
```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```

3. Create API service (`src/services/airtable.ts`):
```typescript
import Airtable from 'airtable';
import { Property } from '../data/mockProperties';

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY })
  .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export async function fetchProperties(): Promise<Property[]> {
  const records = await base('Properties').select().all();
  return records.map(record => ({
    id: record.id,
    title: record.get('title') as string,
    description: record.get('description') as string,
    price: record.get('price') as number,
    // ... map all fields
  }));
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await base('Contacts').create({
    Name: data.name,
    Email: data.email,
    Phone: data.phone,
    Message: data.message,
    Date: new Date().toISOString(),
  });
}
```

4. Update pages to use Airtable:
```typescript
// In Properties.tsx or Home.tsx
import { fetchProperties } from '../services/airtable';

const [properties, setProperties] = useState<Property[]>([]);

useEffect(() => {
  fetchProperties().then(setProperties);
}, []);
```

## 🎨 Customizing Colors

All colors are centralized in `siteConfig.ts`. Update these to match your brand:

```typescript
colors: {
  primary: "#YOUR_PRIMARY_COLOR",
  secondary: "#YOUR_SECONDARY_COLOR",
  // ...
}
```

Colors are used throughout the app via Tailwind classes:
- Gradients: `from-[#8B5CF6] to-[#3B82F6]`
- Backgrounds: `bg-[#1E293B]`
- Text: `text-[#F8FAFC]`

## 📱 WhatsApp Integration

WhatsApp links are generated automatically using the config:

```typescript
// Opens WhatsApp with pre-filled message
const handleWhatsAppClick = () => {
  const message = "Your custom message";
  window.open(
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};
```

## 🚀 Deployment Checklist

1. ✅ Update `src/config/siteConfig.ts` with client information
2. ✅ Replace logo/brand assets
3. ✅ Connect Airtable (if using)
4. ✅ Update WhatsApp number
5. ✅ Test contact form submissions
6. ✅ Update SEO meta tags in `siteConfig.ts`
7. ✅ Test all links and navigation
8. ✅ Verify responsive design on mobile
9. ✅ Update privacy policy and terms (if needed)

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## 📦 Tech Stack

- **React 18.3** - UI library
- **Vite 6.3** - Build tool
- **React Router 7** - Routing
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Lucide React** - Icons
- **Radix UI** - Accessible components

## 🎯 Performance Tips

- All images are lazy-loaded
- Smooth scroll behavior enabled
- Optimized for Core Web Vitals
- Minimal bundle size with code splitting

## 🔒 Security Notes

- Never commit `.env` file
- Keep Airtable API keys private
- Validate all form inputs
- Use HTTPS in production

## 📝 License

Customizable for multiple clients. Update branding and content via `siteConfig.ts`.

---

**Questions?** Check the code comments or refer to component documentation.
