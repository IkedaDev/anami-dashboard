import { Client } from './client.model';

export interface Appointment {
  id: string;
  startsAt: Date | string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  totalPrice: number;
  locationType: 'HOTEL' | 'PARTICULAR' | 'STUDIO';
  clientId: string;
  client: Partial<Client> & { fullName?: string };
  items: AppointmentItem[];
}

export interface AppointmentItem {
  id?: string;
  serviceId?: string;
  service: {
    name: string;
    price?: number;
  };
}

