import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Home, 
  Building2, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Image, 
  Video, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  X,
  Menu,
  LogOut,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { siteConfig } from "../../config/siteConfig";
import { mockProperties } from "../../data/mockProperties";
import CRMSystem from "../components/crm/CRMSystem";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent";
  avatar: string;
  lastLogin: string;
}

interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  yearsInBusiness: number;
  mission: string;
  values: string[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: 0,
    currency: "USD",
    location: "",
    city: "",
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    type: "apartment",
    operation: "buy",
    featured: false,
    yearBuilt: new Date().getFullYear(),
    parking: 0,
    amenities: {
      wifi: false,
      airConditioning: false,
      pool: false,
      garage: false,
      security: false,
      gym: false,
      terrace: false,
      furnished: false,
    },
    images: [""],
    videoUrl: "",
    floorPlan: ""
  });
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    role: "agent" as "admin" | "agent",
    avatar: "",
    phone: "",
    bio: ""
  });
  const [editingSettings, setEditingSettings] = useState<SiteSettings>({
    companyName: "LuxeState",
    tagline: "Soluciones Inmobiliarias Premium",
    phone: "+598 987 654 32",
    email: "info@luxestate.com",
    whatsapp: "59898765432",
    address: "Av. 18 de Julio 1234, Montevideo, Uruguay",
    yearsInBusiness: 5,
    mission: "Hacer sueños realidad. Creemos que cada propiedad es más que un simple edificio - es el lugar donde se crean memorias, se construyen futuros y se viven los momentos más importantes de la vida.",
    values: ["Hacer Sueños Realidad", "Hacer Posible lo Imposible", "Integridad Inquebrantable", "Excelencia Moral"]
  });

  // Mock agents data
  const [agents, setAgents] = useState<AdminUser[]>([
    {
      id: "1",
      name: "Martín Rodríguez",
      email: "martin@luxestate.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      lastLogin: "2024-04-20 15:30"
    },
    {
      id: "2",
      name: "Sofía Martínez",
      email: "sofia@luxestate.com",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=100&q=80",
      lastLogin: "2024-04-20 14:15"
    }
  ]);

  // Mock statistics
  const stats = {
    totalProperties: mockProperties.length,
    featuredProperties: mockProperties.filter(p => p.featured).length,
    totalAgents: agents.length,
    avgPrice: Math.round(mockProperties.reduce((acc, p) => acc + p.price, 0) / mockProperties.length),
    monthlyViews: 15420,
    newLeads: 89,
    conversionRate: 12.5
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "properties", label: "Propiedades", icon: Building2 },
    { id: "agents", label: "Agentes", icon: Users },
    { id: "crm", label: "CRM", icon: Phone },
    { id: "analytics", label: "Análisis", icon: BarChart3 },
    { id: "settings", label: "Configuración", icon: Settings },
    { id: "content", label: "Contenido", icon: FileText },
  ];

  const handleLogout = () => {
    // Simulate logout
    navigate("/");
  };

  const handleAddProperty = () => {
    setShowPropertyForm(true);
    setNewProperty({
      title: "",
      description: "",
      price: 0,
      currency: "USD",
      location: "",
      city: "",
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      type: "apartment",
      operation: "buy",
      featured: false,
      yearBuilt: new Date().getFullYear(),
      parking: 0,
      amenities: {
        wifi: false,
        airConditioning: false,
        pool: false,
        garage: false,
        security: false,
        gym: false,
        terrace: false,
        furnished: false,
      },
      images: [""],
      videoUrl: "",
      floorPlan: ""
    });
  };

  const handleSaveProperty = () => {
    // Simulate saving property
    console.log("Saving property:", newProperty);
    setShowPropertyForm(false);
    // In a real app, this would save to backend
  };

  const handleAddAgent = () => {
    setShowAgentForm(true);
    setNewAgent({
      name: "",
      email: "",
      role: "agent",
      avatar: "",
      phone: "",
      bio: ""
    });
  };

  const handleSaveAgent = () => {
    // Simulate saving agent
    const agent: AdminUser = {
      id: Date.now().toString(),
      ...newAgent,
      lastLogin: new Date().toLocaleString()
    };
    setAgents([...agents, agent]);
    setShowAgentForm(false);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta propiedad?")) {
      console.log("Deleting property:", id);
      // In a real app, this would delete from backend
    }
  };

  const handleDeleteAgent = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este agente?")) {
      setAgents(agents.filter(agent => agent.id !== id));
    }
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", editingSettings);
    // In a real app, this would save to backend
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#F8FAFC]">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#8B5CF6]/20 rounded-lg">
              <Building2 className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-sm text-[#94A3B8]">+12%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">{stats.totalProperties}</div>
          <div className="text-sm text-[#94A3B8]">Total Propiedades</div>
        </div>

        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
              <Star className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-sm text-[#94A3B8]">+8%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">{stats.featuredProperties}</div>
          <div className="text-sm text-[#94A3B8]">Propiedades Destacadas</div>
        </div>

        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#06B6D4]/20 rounded-lg">
              <Users className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <span className="text-sm text-[#94A3B8]">+2</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">{stats.totalAgents}</div>
          <div className="text-sm text-[#94A3B8]">Agentes Activos</div>
        </div>

        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#10B981]/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-sm text-[#94A3B8]">+15%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">${stats.avgPrice.toLocaleString()}</div>
          <div className="text-sm text-[#94A3B8]">Precio Promedio</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
        <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#8B5CF6]/20 rounded-lg">
                <Eye className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div>
                <div className="text-[#F8FAFC] font-medium">Nueva visita a propiedad</div>
                <div className="text-sm text-[#94A3B8]">Penthouse de Lujo en Pocitos</div>
              </div>
            </div>
            <div className="text-sm text-[#94A3B8]">Hace 2 horas</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
                <Phone className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-[#F8FAFC] font-medium">Contacto WhatsApp</div>
                <div className="text-sm text-[#94A3B8]">Villa de Lujo en Punta del Este</div>
              </div>
            </div>
            <div className="text-sm text-[#94A3B8]">Hace 4 horas</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#06B6D4]/20 rounded-lg">
                <Mail className="w-4 h-4 text-[#06B6D4]" />
              </div>
              <div>
                <div className="text-[#F8FAFC] font-medium">Formulario de contacto</div>
                <div className="text-sm text-[#94A3B8]">Consulta sobre apartamento en Carrasco</div>
              </div>
            </div>
            <div className="text-sm text-[#94A3B8]">Hace 6 horas</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#F8FAFC]">Propiedades</h2>
        <Button onClick={handleAddProperty} className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB]">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Propiedad
        </Button>
      </div>

      {/* Properties Table */}
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F172A] border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Propiedad</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {mockProperties.map((property) => (
                <tr key={property.id} className="hover:bg-[#0F172A] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-[#F8FAFC] font-medium">{property.title}</div>
                        <div className="text-sm text-[#94A3B8]">{property.type === "apartment" ? "Apartamento" : "Casa"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[#F8FAFC] font-medium">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#94A3B8]">{property.currency}</div>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">
                    {property.location}, {property.city}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      property.featured 
                        ? "bg-[#06B6D4]/20 text-[#06B6D4]" 
                        : "bg-[#334155] text-[#94A3B8]"
                    }`}>
                      {property.featured ? "Destacada" : "Normal"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-[#334155] text-[#94A3B8] hover:bg-[#0F172A]">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#334155] text-[#94A3B8] hover:bg-[#0F172A]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteProperty(property.id)} className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#F8FAFC]">Agentes</h2>
        <Button onClick={handleAddAgent} className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB]">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Agente
        </Button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-[#F8FAFC] font-semibold">{agent.name}</h3>
                <p className="text-sm text-[#94A3B8]">{agent.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    agent.role === "admin" 
                      ? "bg-[#8B5CF6]/20 text-[#8B5CF6]" 
                      : "bg-[#334155] text-[#94A3B8]"
                  }`}>
                    {agent.role === "admin" ? "Administrador" : "Agente"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-[#94A3B8] mb-4">
              <span>Último login: {agent.lastLogin}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-[#334155] text-[#94A3B8] hover:bg-[#0F172A]">
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDeleteAgent(agent.id)} className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#F8FAFC]">Configuración del Sitio</h2>
      
      <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
        <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Información de la Empresa</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">Nombre de la Empresa</Label>
            <Input
              value={editingSettings.companyName}
              onChange={(e) => setEditingSettings({...editingSettings, companyName: e.target.value})}
              className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">Tagline</Label>
            <Input
              value={editingSettings.tagline}
              onChange={(e) => setEditingSettings({...editingSettings, tagline: e.target.value})}
              className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">Teléfono</Label>
            <Input
              value={editingSettings.phone}
              onChange={(e) => setEditingSettings({...editingSettings, phone: e.target.value})}
              className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">Email</Label>
            <Input
              value={editingSettings.email}
              onChange={(e) => setEditingSettings({...editingSettings, email: e.target.value})}
              className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">WhatsApp</Label>
            <Input
              value={editingSettings.whatsapp}
              onChange={(e) => setEditingSettings({...editingSettings, whatsapp: e.target.value})}
              className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">Dirección</Label>
            <Input
              value={editingSettings.address}
              onChange={(e) => setEditingSettings({...editingSettings, address: e.target.value})}
              className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">Misión</Label>
          <Textarea
            value={editingSettings.mission}
            onChange={(e) => setEditingSettings({...editingSettings, mission: e.target.value})}
            className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] min-h-[100px]"
          />
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB]">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#F8FAFC]">Análisis y Estadísticas</h2>
      
      {/* Period Selector */}
      <div className="flex items-center gap-4">
        <Select defaultValue="30">
          <SelectTrigger className="w-48 bg-[#1E293B] border-[#334155] text-[#F8FAFC]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1E293B] border-[#334155]">
            <SelectItem value="7" className="text-[#F8FAFC]">Últimos 7 días</SelectItem>
            <SelectItem value="30" className="text-[#F8FAFC]">Últimos 30 días</SelectItem>
            <SelectItem value="90" className="text-[#F8FAFC]">Últimos 3 meses</SelectItem>
            <SelectItem value="365" className="text-[#F8FAFC]">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#8B5CF6]/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-sm text-green-400">+23.5%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">15,420</div>
          <div className="text-sm text-[#94A3B8]">Visitas Totales</div>
        </div>

        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
              <Phone className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-sm text-green-400">+18.2%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">89</div>
          <div className="text-sm text-[#94A3B8]">Leads Generados</div>
        </div>

        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#06B6D4]/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <span className="text-sm text-green-400">+12.8%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">12.5%</div>
          <div className="text-sm text-[#94A3B8]">Tasa Conversión</div>
        </div>

        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#10B981]/20 rounded-lg">
              <Calendar className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-sm text-green-400">+8.1%</span>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC] mb-1">24</div>
          <div className="text-sm text-[#94A3B8]">Visitas Agendadas</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">Tráfico del Sitio</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Visitas Directas</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-[#0F172A] rounded-full h-2">
                  <div className="bg-[#8B5CF6] h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-[#F8FAFC] font-medium">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Búsqueda Orgánica</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-[#0F172A] rounded-full h-2">
                  <div className="bg-[#3B82F6] h-2 rounded-full" style={{width: '20%'}}></div>
                </div>
                <span className="text-[#F8FAFC] font-medium">20%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Redes Sociales</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-[#0F172A] rounded-full h-2">
                  <div className="bg-[#06B6D4] h-2 rounded-full" style={{width: '10%'}}></div>
                </div>
                <span className="text-[#F8FAFC] font-medium">10%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Referidos</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-[#0F172A] rounded-full h-2">
                  <div className="bg-[#10B981] h-2 rounded-full" style={{width: '5%'}}></div>
                </div>
                <span className="text-[#F8FAFC] font-medium">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Performance */}
        <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
          <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">Rendimiento de Propiedades</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Penthouse de Lujo</span>
              <div className="flex items-center gap-2">
                <span className="text-[#F8FAFC] font-medium">342 visitas</span>
                <span className="text-sm text-green-400">+12%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Villa en Punta del Este</span>
              <div className="flex items-center gap-2">
                <span className="text-[#F8FAFC] font-medium">287 visitas</span>
                <span className="text-sm text-green-400">+8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Apartamento en Pocitos</span>
              <div className="flex items-center gap-2">
                <span className="text-[#F8FAFC] font-medium">198 visitas</span>
                <span className="text-sm text-green-400">+15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Casa en Carrasco</span>
              <div className="flex items-center gap-2">
                <span className="text-[#F8FAFC] font-medium">156 visitas</span>
                <span className="text-sm text-red-400">-3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155]">
        <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Embudo de Conversión</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-lg p-4 mb-2">
              <div className="text-2xl font-bold text-white">15,420</div>
              <div className="text-sm text-white/80">Visitas</div>
            </div>
            <div className="text-sm text-[#94A3B8]">100%</div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-lg p-4 mb-2">
              <div className="text-2xl font-bold text-white">3,084</div>
              <div className="text-sm text-white/80">Interacciones</div>
            </div>
            <div className="text-sm text-[#94A3B8]">20%</div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-lg p-4 mb-2">
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-sm text-white/80">Leads</div>
            </div>
            <div className="text-sm text-[#94A3B8]">0.6%</div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#10B981] to-[#8B5CF6] rounded-lg p-4 mb-2">
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-sm text-white/80">Visitas</div>
            </div>
            <div className="text-sm text-[#94A3B8]">0.2%</div>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="p-6 border-b border-[#334155]">
          <h3 className="text-xl font-semibold text-[#F8FAFC]">Leads Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F172A] border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Propiedad</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              <tr className="hover:bg-[#0F172A] transition-colors">
                <td className="px-6 py-4 text-[#94A3B8]">20/04/2024</td>
                <td className="px-6 py-4 text-[#F8FAFC] font-medium">María González</td>
                <td className="px-6 py-4 text-[#94A3B8]">maria@email.com</td>
                <td className="px-6 py-4 text-[#94A3B8]">Penthouse de Lujo</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                    Nuevo
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#0F172A] transition-colors">
                <td className="px-6 py-4 text-[#94A3B8]">20/04/2024</td>
                <td className="px-6 py-4 text-[#F8FAFC] font-medium">Carlos Rodríguez</td>
                <td className="px-6 py-4 text-[#94A3B8]">+598 987 654 32</td>
                <td className="px-6 py-4 text-[#94A3B8]">Villa en Punta del Este</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                    Contactado
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#0F172A] transition-colors">
                <td className="px-6 py-4 text-[#94A3B8]">19/04/2024</td>
                <td className="px-6 py-4 text-[#F8FAFC] font-medium">Ana Martínez</td>
                <td className="px-6 py-4 text-[#94A3B8]">ana@email.com</td>
                <td className="px-6 py-4 text-[#94A3B8]">Apartamento en Pocitos</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                    Visita Agendada
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "properties":
        return renderProperties();
      case "agents":
        return renderAgents();
      case "crm":
        return <CRMSystem />;
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Header */}
      <header className="bg-[#1E293B] border-b border-[#334155]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#0F172A] transition-colors"
              >
                <Menu className="w-5 h-5 text-[#F8FAFC]" />
              </button>
              <div className="flex items-center gap-2">
                <div className="text-2xl">LuxeState</div>
                <div className="px-2 py-1 bg-[#8B5CF6]/20 rounded-lg">
                  <span className="text-xs text-[#8B5CF6] font-medium">Admin</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-[#94A3B8] hover:text-[#F8FAFC]">
                <Shield className="w-4 h-4 mr-2" />
                Seguridad
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-[#94A3B8] hover:text-[#F8FAFC]">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block w-64 bg-[#1E293B] border-r border-[#334155] min-h-screen`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-[#8B5CF6]/20 text-[#8B5CF6]"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
