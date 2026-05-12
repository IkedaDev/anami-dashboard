import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AnTableComponent, AnPaginationComponent, AnCardStatsComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Appointment } from '@models/business/appoinment.model';
import { AnTableColumn } from '@models/components/table.model';

@Component({
  selector: 'app-appointments-page',
  standalone: true,
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './appointments-page.html',
})
export class AppointmentsPage {
  // Columnas configuradas para los nuevos modelos
  public columns = signal<AnTableColumn[]>([
    { key: 'startsAt', label: 'Fecha y Hora' },
    { key: 'client', label: 'Cliente' },
    { key: 'items', label: 'Servicios' },
    { key: 'totalPrice', label: 'Total' },
    { key: 'locationType', label: 'Ubicación' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  // Data Mock usando tu interfaz Appointment
  public appointments = signal<Appointment[]>([
    {
      id: 'app-001',
      startsAt: new Date('2024-05-28T09:00:00'),
      status: 'SCHEDULED',
      totalPrice: 35000,
      locationType: 'HOTEL',
      clientId: 'cli-ikeda',
      client: {
        id: 'cli-ikeda',
        name: 'Sebastian Ikeda',
        phone: '+56912345678',
        email: 's.ikeda@anami.com',
      },
      items: [
        {
          id: 'item-1',
          serviceId: 'srv-001',
          service: { name: 'Masaje Descontracturante' },
        },
      ],
    },
    {
      id: 'app-002',
      startsAt: new Date('2024-05-28T11:30:00'),
      status: 'COMPLETED',
      totalPrice: 65000,
      locationType: 'STUDIO',
      clientId: 'cli-ana',
      client: {
        id: 'cli-ana',
        name: 'Ana María',
        phone: '+56987654321',
        email: 'ana.m@gmail.com',
      },
      items: [
        {
          id: 'item-2',
          serviceId: 'srv-002',
          service: { name: 'Piedras Calientes' },
        },
        {
          id: 'item-3',
          serviceId: 'srv-003',
          service: { name: 'Exfoliación' },
        },
      ],
    },
  ]);

  public page = signal(1);

  onCancel(id: string) {
    console.log('Cancelando cita:', id);
  }
}
