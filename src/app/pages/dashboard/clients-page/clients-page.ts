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

  public page = signal(1);
  public totalClients = signal(1250);

  handleEdit(client: Client) {
    console.log('Editando cliente:', client.fullName);
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
  }
}
