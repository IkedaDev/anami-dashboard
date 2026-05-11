import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AnCardStatsComponent,
  AnTableComponent,
  AnPaginationComponent,
  AnIconComponent,
} from '@components/index';
import { AnTemplateDirective } from '@directives/index';
import { Client } from '@models/business/index';
import { AnTableColumn } from '@models/components';
import { ClientService } from '@services/client/client';
import { rxResource } from '@angular/core/rxjs-interop';
import { ToastService } from '@services/index';
import { DrawerService } from '@services/drawer/drawer.service';
import { ClientForm } from './client-form/client-form';

@Component({
  selector: 'app-clients-page',
  imports: [
    AnTableComponent,
    CommonModule,
    ReactiveFormsModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    AnIconComponent,
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage {
  public clientService = inject(ClientService);
  public drawerService = inject(DrawerService);
  private toast = inject(ToastService);
  public searchQuery = signal<string>('');
  public currentPage = signal<number>(1);
  public limit = signal<number>(6);

  clientsResource = rxResource({
    params: () => ({
      page: this.currentPage(),
      limit: this.limit(),
      q: this.searchQuery(),
    }),
    stream: ({ params }) => this.clientService.getPaginated(params.page, params.limit, params.q),
  });

  changePage(newPage: number) {
    this.currentPage.set(newPage);
  }

  public columns = signal<AnTableColumn[]>([
    { key: 'fullName', label: 'Nombre Completo' },
    { key: 'rut', label: 'RUT' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'actions', label: 'Acciones' },
  ]);

  openNewClient() {
    this.clientService.selectedClient.set(null);
    this.drawerService.open({ title: 'Nuevo Cliente', component: ClientForm });
  }

  handleEdit(client: Client) {
    this.clientService.selectedClient.set({ ...client });
    this.drawerService.open({
      title: 'Editar Cliente',
      component: ClientForm,
    });
  }

  handleDelete(client: Client) {
    this.toast.show(`${client.fullName} se ha eliminado`, 'success');
  }
}
