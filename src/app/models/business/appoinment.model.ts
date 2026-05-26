import { Client } from './client.model';

export interface Appointment {
  id: string;
  startsAt: Date | string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  totalPrice: number;
  anamiShare: number;
  hotelShare: number
  locationType: 'HOTEL' | 'PARTICULAR' | 'STUDIO';
  clientId: string;
  client: Partial<Client> & { name?: string };
  items: AppointmentItem[];
  durationMinutes?: number;
  hasNailCut?: boolean;
  notes?: string;
}

export interface AppointmentItem {
  id?: string;
  serviceId?: string;
  service: {
    name: string;
    price?: number;
  };
}

