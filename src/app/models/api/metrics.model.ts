export interface TopClient {
  id: string;
  name: string;
  appointmentCount: number;
}

export interface ClientMetrics {
  totalClients: number;
  clientsWithRutCount: number;
  clientsWithRutPercentage: number;
  newClientsThisMonth: number;
  newClientsLastMonth: number;
  newClientsTrendPercentage: number;
  newClientsTrendDirection: 'up' | 'down' | 'neutral';
  retentionRate: number;
  averageLtv: number;
  clientsWithEmailCount: number;
  clientsWithEmailPercentage: number;
  clientsWithPhoneCount: number;
  clientsWithPhonePercentage: number;
  topClients: TopClient[];
}

export interface ServicePerformance {
  id: string;
  name: string;
  bookingCount: number;
  revenueGenerated: number;
}

export interface ServiceMetrics {
  totalServices: number;
  averagePrice: number;
  activeServicesCount: number;
  noShowRate: number;
  mostBookedServices: ServicePerformance[];
  highestRevenueServices: ServicePerformance[];
  averageDurationMin: number;
  minPrice: number;
  maxPrice: number;
  activePercentage: number;
}
