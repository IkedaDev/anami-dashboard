import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AnCardStatsComponent } from '@components/card-stats/card-stats.component';
import { AnTableComponent } from '@components/index';
import { AnPaginationComponent } from '@components/pagination/pagination.component';
import { AnTemplateDirective } from '@directives/index';
import { AnTableColumn, Client } from '@models/index';

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
    { key: 'fullName', label: 'Nombre Completo' },
    { key: 'rut', label: 'RUT' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Telefono' },
    { key: 'address', label: 'Dirección' },
    { key: 'actions', label: 'Acciones' },
  ]);

  // Data Mock que sigue tu estructura de Prisma
  public clients = signal<Client[]>([
    {
      id: '0vic6sjo1lhksxadts6462',
      fullName: 'Sebastian Ikeda',
      rut: '19.158.143-1',
      email: 's.ikeda@anami.com',
      phone: '+56912345678',
      address: 'Newen Antu 962, La Florida',
      notes: 'Alergia a aceites cítricos',
    },
    {
      id: 'u928js82js82js82js82',
      fullName: 'Ana María',
      rut: '12.345.678-9',
      email: 'ana.m@gmail.com',
      phone: '+56987654321',
      address: 'Providencia 1234, Of 51',
    },
  ]);

  public page = signal(1);
  public totalClients = signal(1250);

  handleEdit(client: Client) {
    console.log('Editando cliente:', client.fullName);
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
  }
}
