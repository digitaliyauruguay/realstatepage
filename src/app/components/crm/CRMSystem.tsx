import { useState, useEffect } from "react";
import { 
  Users, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  PhoneCall, 
  Video, 
  MapPin, 
  DollarSign, 
  Building2,
  TrendingUp,
  UserPlus,
  FileText,
  Bell,
  ChevronRight,
  Star,
  Target,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { mockProperties } from "../../../data/mockProperties";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: "web" | "whatsapp" | "phone" | "referral" | "social";
  status: "new" | "contacted" | "interested" | "visiting" | "negotiating" | "closed" | "lost";
  priority: "low" | "medium" | "high";
  assignedAgent: string;
  property: string;
  propertyId: string;
  budget: number;
  timeline: string;
  notes: string;
  createdAt: string;
  lastContact: string;
  nextFollowUp: string;
  activities: Activity[];
  tags: string[];
}

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "whatsapp";
  title: string;
  description: string;
  date: string;
  agent: string;
  duration?: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  relatedLead: string;
}

interface CRMSystemProps {
  agentId?: string;
}

export default function CRMSystem({ agentId }: CRMSystemProps) {
  const [activeTab, setActiveTab] = useState("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [newActivity, setNewActivity] = useState({ type: "note", title: "", description: "" });

  // Mock data - en producción vendría de API
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+598 987 654 32",
      source: "web",
      status: "interested",
      priority: "high",
      assignedAgent: "Martín Rodríguez",
      property: "Penthouse de Lujo en Pocitos",
      propertyId: "1",
      budget: 500000,
      timeline: "1-2 meses",
      notes: "Interesada en propiedades con vistas al mar. Tiene aprobación pre-hipotecaria.",
      createdAt: "2024-04-20T10:30:00Z",
      lastContact: "2024-04-20T15:45:00Z",
      nextFollowUp: "2024-04-22T10:00:00Z",
      activities: [
        {
          id: "1",
          type: "call",
          title: "Llamada inicial",
          description: "Contacto telefónico para conocer sus necesidades. Muy interesada.",
          date: "2024-04-20T15:45:00Z",
          agent: "Martín Rodríguez",
          duration: 15
        },
        {
          id: "2",
          type: "email",
          title: "Envío de propiedades",
          description: "Enviadas 3 propiedades que coinciden con sus criterios.",
          date: "2024-04-20T16:00:00Z",
          agent: "Martín Rodríguez"
        }
      ],
      tags: ["VIP", "Pre-aprobado", "Urgente"]
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "+598 912 345 67",
      source: "whatsapp",
      status: "visiting",
      priority: "medium",
      assignedAgent: "Sofía Martínez",
      property: "Villa en Punta del Este",
      propertyId: "2",
      budget: 750000,
      timeline: "3-4 meses",
      notes: "Busca segunda vivienda para vacaciones. Visitará el fin de semana.",
      createdAt: "2024-04-19T14:20:00Z",
      lastContact: "2024-04-20T11:30:00Z",
      nextFollowUp: "2024-04-21T14:00:00Z",
      activities: [
        {
          id: "3",
          type: "whatsapp",
          title: "Consulta inicial",
          description: "Pregunta sobre villa en Punta del Este.",
          date: "2024-04-19T14:20:00Z",
          agent: "Sofía Martínez"
        },
        {
          id: "4",
          type: "meeting",
          title: "Visita agendada",
          description: "Visita programada para el sábado 10am.",
          date: "2024-04-20T11:30:00Z",
          agent: "Sofía Martínez",
          duration: 60
        }
      ],
      tags: ["Vacaciones", "Punta del Este"]
    },
    {
      id: "3",
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      phone: "+598 945 678 90",
      source: "phone",
      status: "new",
      priority: "low",
      assignedAgent: "Martín Rodríguez",
      property: "Apartamento en Carrasco",
      propertyId: "3",
      budget: 300000,
      timeline: "6+ meses",
      notes: "Primera vez comprando. Necesita asesoramiento completo.",
      createdAt: "2024-04-20T09:15:00Z",
      lastContact: "2024-04-20T09:15:00Z",
      nextFollowUp: "2024-04-21T16:00:00Z",
      activities: [
        {
          id: "5",
          type: "call",
          title: "Llamada telefónica",
          description: "Consulta general sobre apartamentos en Carrasco.",
          date: "2024-04-20T09:15:00Z",
          agent: "Martín Rodríguez",
          duration: 10
        }
      ],
      tags: ["Primeriza", "Carrasco"]
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Llamar a María González",
      description: "Seguimiento sobre su interés en el penthouse",
      assignedTo: "Martín Rodríguez",
      dueDate: "2024-04-22T10:00:00Z",
      priority: "high",
      status: "pending",
      relatedLead: "1"
    },
    {
      id: "2",
      title: "Preparar visita para Carlos Rodríguez",
      description: "Tener lista de documentos necesarios",
      assignedTo: "Sofía Martínez",
      dueDate: "2024-04-21T09:00:00Z",
      priority: "medium",
      status: "in-progress",
      relatedLead: "2"
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-gray-500/20 text-gray-400",
      contacted: "bg-blue-500/20 text-blue-400",
      interested: "bg-purple-500/20 text-purple-400",
      visiting: "bg-yellow-500/20 text-yellow-400",
      negotiating: "bg-orange-500/20 text-orange-400",
      closed: "bg-green-500/20 text-green-400",
      lost: "bg-red-500/20 text-red-400"
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-500/20 text-gray-400",
      medium: "bg-yellow-500/20 text-yellow-400",
      high: "bg-red-500/20 text-red-400"
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getSourceIcon = (source: string) => {
    const icons = {
      web: <Users className="w-4 h-4" />,
      whatsapp: <MessageSquare className="w-4 h-4" />,
      phone: <Phone className="w-4 h-4" />,
      referral: <UserPlus className="w-4 h-4" />,
      social: <Star className="w-4 h-4" />
    };
    return icons[source as keyof typeof icons] || icons.web;
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    const matchesPriority = filterPriority === "all" || lead.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddActivity = () => {
    if (selectedLead && newActivity.title && newActivity.description) {
      const activity: Activity = {
        id: Date.now().toString(),
        type: newActivity.type as any,
        title: newActivity.title,
        description: newActivity.description,
        date: new Date().toISOString(),
        agent: "Usuario actual"
      };
      
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, activities: [...lead.activities, activity], lastContact: activity.date }
          : lead
      ));
      
      setNewActivity({ type: "note", title: "", description: "" });
    }
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus as any } : lead
    ));
  };

  const getStats = () => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === "new").length;
    const interested = leads.filter(l => l.status === "interested").length;
    const visiting = leads.filter(l => l.status === "visiting").length;
    const closed = leads.filter(l => l.status === "closed").length;
    const conversionRate = total > 0 ? ((closed / total) * 100).toFixed(1) : "0";

    return { total, newLeads, interested, visiting, closed, conversionRate };
  };

  const stats = getStats();

  const renderLeadsList = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">Total Leads</p>
                <p className="text-2xl font-bold text-[#F8FAFC]">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-[#8B5CF6]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">Nuevos</p>
                <p className="text-2xl font-bold text-[#F8FAFC]">{stats.newLeads}</p>
              </div>
              <UserPlus className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">Interesados</p>
                <p className="text-2xl font-bold text-[#F8FAFC]">{stats.interested}</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">Visitando</p>
                <p className="text-2xl font-bold text-[#F8FAFC]">{stats.visiting}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">Cerrados</p>
                <p className="text-2xl font-bold text-[#F8FAFC]">{stats.closed}</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#1E293B] rounded-xl p-4 border-[#334155]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
              <Input
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
              />
            </div>
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              <SelectItem value="all" className="text-[#F8FAFC]">Todos los estados</SelectItem>
              <SelectItem value="new" className="text-[#F8FAFC]">Nuevos</SelectItem>
              <SelectItem value="contacted" className="text-[#F8FAFC]">Contactados</SelectItem>
              <SelectItem value="interested" className="text-[#F8FAFC]">Interesados</SelectItem>
              <SelectItem value="visiting" className="text-[#F8FAFC]">Visitando</SelectItem>
              <SelectItem value="negotiating" className="text-[#F8FAFC]">Negociando</SelectItem>
              <SelectItem value="closed" className="text-[#F8FAFC]">Cerrados</SelectItem>
              <SelectItem value="lost" className="text-[#F8FAFC]">Perdidos</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-48 bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              <SelectItem value="all" className="text-[#F8FAFC]">Todas las prioridades</SelectItem>
              <SelectItem value="high" className="text-[#F8FAFC]">Alta</SelectItem>
              <SelectItem value="medium" className="text-[#F8FAFC]">Media</SelectItem>
              <SelectItem value="low" className="text-[#F8FAFC]">Baja</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowNewLeadForm(true)} className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#1E293B] rounded-xl border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F172A] border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Propiedad</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Agente</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#0F172A] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="font-medium text-[#F8FAFC]">{lead.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {getSourceIcon(lead.source)}
                          <span className="text-xs text-[#94A3B8]">{lead.source}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(lead.priority)}`}>
                            {lead.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-[#94A3B8]">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[#94A3B8]">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-[#F8FAFC]">{lead.property}</div>
                      <div className="text-sm text-[#94A3B8]">${lead.budget.toLocaleString()}</div>
                      <div className="text-xs text-[#94A3B8]">{lead.timeline}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">
                    {lead.assignedAgent}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowLeadDetails(true);
                        }}
                        className="border-[#334155] text-[#94A3B8] hover:bg-[#0F172A]"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Select value={lead.status} onValueChange={(value) => handleStatusChange(lead.id, value)}>
                        <SelectTrigger className="w-32 h-8 bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1E293B] border-[#334155]">
                          <SelectItem value="new" className="text-[#F8FAFC]">Nuevo</SelectItem>
                          <SelectItem value="contacted" className="text-[#F8FAFC]">Contactado</SelectItem>
                          <SelectItem value="interested" className="text-[#F8FAFC]">Interesado</SelectItem>
                          <SelectItem value="visiting" className="text-[#F8FAFC]">Visitando</SelectItem>
                          <SelectItem value="negotiating" className="text-[#F8FAFC]">Negociando</SelectItem>
                          <SelectItem value="closed" className="text-[#F8FAFC]">Cerrado</SelectItem>
                          <SelectItem value="lost" className="text-[#F8FAFC]">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
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

  const renderLeadDetails = () => {
    if (!selectedLead) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-[#1E293B] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-[#334155]">
          <div className="p-6 border-b border-[#334155] flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#F8FAFC]">Detalles del Lead</h2>
            <Button variant="ghost" onClick={() => setShowLeadDetails(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Lead Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Información Personal</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Nombre</Label>
                    <p className="text-[#F8FAFC]">{selectedLead.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Email</Label>
                    <p className="text-[#F8FAFC]">{selectedLead.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Teléfono</Label>
                    <p className="text-[#F8FAFC]">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Fuente</Label>
                    <div className="flex items-center gap-2">
                      {getSourceIcon(selectedLead.source)}
                      <span className="text-[#F8FAFC]">{selectedLead.source}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Información de Búsqueda</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Propiedad</Label>
                    <p className="text-[#F8FAFC]">{selectedLead.property}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Presupuesto</Label>
                    <p className="text-[#F8FAFC]">${selectedLead.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Timeline</Label>
                    <p className="text-[#F8FAFC]">{selectedLead.timeline}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Agente Asignado</Label>
                    <p className="text-[#F8FAFC]">{selectedLead.assignedAgent}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm text-[#94A3B8]">Estado</Label>
                <Select value={selectedLead.status} onValueChange={(value) => handleStatusChange(selectedLead.id, value)}>
                  <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-[#334155]">
                    <SelectItem value="new" className="text-[#F8FAFC]">Nuevo</SelectItem>
                    <SelectItem value="contacted" className="text-[#F8FAFC]">Contactado</SelectItem>
                    <SelectItem value="interested" className="text-[#F8FAFC]">Interesado</SelectItem>
                    <SelectItem value="visiting" className="text-[#F8FAFC]">Visitando</SelectItem>
                    <SelectItem value="negotiating" className="text-[#F8FAFC]">Negociando</SelectItem>
                    <SelectItem value="closed" className="text-[#F8FAFC]">Cerrado</SelectItem>
                    <SelectItem value="lost" className="text-[#F8FAFC]">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm text-[#94A3B8]">Prioridad</Label>
                <div className={`px-3 py-2 rounded-lg ${getPriorityColor(selectedLead.priority)}`}>
                  {selectedLead.priority}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label className="text-sm text-[#94A3B8]">Notas</Label>
              <Textarea
                value={selectedLead.notes}
                readOnly
                className="bg-[#0F172A] border-[#334155] text-[#F8FAFC] min-h-[100px]"
              />
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm text-[#94A3B8]">Etiquetas</Label>
              <div className="flex gap-2 flex-wrap">
                {selectedLead.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Historial de Actividades</h3>
              <div className="space-y-3">
                {selectedLead.activities.map((activity) => (
                  <div key={activity.id} className="bg-[#0F172A] rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#8B5CF6]/20 rounded-lg">
                          {activity.type === "call" && <Phone className="w-4 h-4 text-[#8B5CF6]" />}
                          {activity.type === "email" && <Mail className="w-4 h-4 text-[#8B5CF6]" />}
                          {activity.type === "meeting" && <Calendar className="w-4 h-4 text-[#8B5CF6]" />}
                          {activity.type === "note" && <FileText className="w-4 h-4 text-[#8B5CF6]" />}
                          {activity.type === "whatsapp" && <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#F8FAFC]">{activity.title}</h4>
                          <p className="text-sm text-[#94A3B8]">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#94A3B8]">{activity.agent}</span>
                            {activity.duration && (
                              <span className="text-xs text-[#94A3B8]">· {activity.duration} min</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-[#94A3B8]">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Activity */}
            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Agregar Actividad</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Tipo</Label>
                    <Select value={newActivity.type} onValueChange={(value) => setNewActivity({...newActivity, type: value})}>
                      <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E293B] border-[#334155]">
                        <SelectItem value="call" className="text-[#F8FAFC]">Llamada</SelectItem>
                        <SelectItem value="email" className="text-[#F8FAFC]">Email</SelectItem>
                        <SelectItem value="meeting" className="text-[#F8FAFC]">Reunión</SelectItem>
                        <SelectItem value="note" className="text-[#F8FAFC]">Nota</SelectItem>
                        <SelectItem value="whatsapp" className="text-[#F8FAFC]">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-[#94A3B8]">Título</Label>
                    <Input
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      placeholder="Título de la actividad"
                      className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-[#94A3B8]">Descripción</Label>
                  <Textarea
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                    placeholder="Descripción de la actividad"
                    className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]"
                  />
                </div>
                <Button onClick={handleAddActivity} className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Actividad
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F8FAFC]">Tareas y Seguimientos</h2>
        <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === "high" ? "bg-red-500" :
                    task.priority === "medium" ? "bg-yellow-500" : "bg-gray-500"
                  }`} />
                  <span className="text-sm text-[#94A3B8]">{task.priority}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.status === "completed" ? "bg-green-500/20 text-green-400" :
                  task.status === "in-progress" ? "bg-blue-500/20 text-blue-400" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {task.status}
                </span>
              </div>
              <h3 className="font-semibold text-[#F8FAFC] mb-2">{task.title}</h3>
              <p className="text-sm text-[#94A3B8] mb-3">{task.description}</p>
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span>{task.assignedTo}</span>
                <span>Vence: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#F8FAFC]">Análisis de Leads</h2>
      
      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B5CF6] mb-2">{stats.conversionRate}%</div>
              <div className="text-sm text-[#94A3B8]">Tasa de Conversión</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3B82F6] mb-2">4.2</div>
              <div className="text-sm text-[#94A3B8]">Promedio de Contactos</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#06B6D4] mb-2">2.5</div>
              <div className="text-sm text-[#94A3B8]">Días a Primer Contacto</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#10B981] mb-2">18</div>
              <div className="text-sm text-[#94A3B8]">Días a Cierre</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Sources */}
      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Fuentes de Leads</h3>
          <div className="space-y-3">
            {["web", "whatsapp", "phone", "referral", "social"].map((source) => {
              const count = leads.filter(l => l.source === source).length;
              const percentage = leads.length > 0 ? (count / leads.length * 100).toFixed(1) : "0";
              return (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(source)}
                    <span className="text-[#F8FAFC]">{source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-[#0F172A] rounded-full h-2">
                      <div 
                        className="bg-[#8B5CF6] h-2 rounded-full" 
                        style={{width: `${percentage}%`}}
                      />
                    </div>
                    <span className="text-[#F8FAFC] w-12 text-right">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#F8FAFC]">CRM Inmobiliario</h1>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#94A3B8]" />
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#334155]">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("leads")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "leads"
                ? "border-[#8B5CF6] text-[#8B5CF6]"
                : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "tasks"
                ? "border-[#8B5CF6] text-[#8B5CF6]"
                : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            Tareas
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-[#8B5CF6] text-[#8B5CF6]"
                : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            Análisis
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "leads" && renderLeadsList()}
      {activeTab === "tasks" && renderTasks()}
      {activeTab === "analytics" && renderAnalytics()}

      {/* Lead Details Modal */}
      {showLeadDetails && renderLeadDetails()}
    </div>
  );
}
