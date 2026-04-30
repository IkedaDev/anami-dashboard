import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AnCardStatsComponent } from '@components/card-stats/card-stats.component';
import { AnTableComponent } from '@components/index';
import { AnPaginationComponent } from '@components/pagination/pagination.component';
import { AnTemplateDirective } from '@directives/index';
import { AnTableColumn } from '@models/index';

@Component({
  selector: 'app-clients-page',
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage {
  public columns = signal<AnTableColumn[]>([
    { key: 'clientName', label: 'Cliente' },
    { key: 'service', label: 'Servicio' },
    { key: 'date', label: 'Fecha' },
    { key: 'status', label: 'Estado' }, // Usaremos template
    { key: 'actions', label: 'Acciones' }, // Usaremos template
  ]);

  // 2. La data cruda del cliente (o de tu API/SQL)
  public appointments = signal([
    {
      id: 101,
      clientName: 'Sebastian Ikeda',
      service: 'Masaje Deportivo',
      date: '2024-05-20',
      isActive: true, // Usaremos este booleano para el template de status
      price: 45000,
    },
    {
      id: 102,
      clientName: 'Ana María',
      service: 'Piedras Calientes',
      date: '2024-05-21',
      isActive: false,
      price: 55000,
    },
  ]);

  handleEdit(appointment: any) {
    console.log('Editando cita:', appointment.id);
  }

  public totalClients = signal(120);
  public page = signal(1);

  onPageChange(newPage: number) {
    this.page.set(newPage);
    // Aquí llamarías a tu API o TanStack Query para traer la nueva página
    // this.clientService.fetch(newPage);
  }
}
