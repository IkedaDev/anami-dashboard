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
import { ClientService } from '@services/client/client.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DrawerService } from '@services/drawer/drawer.service';
import { ClientForm } from './client-form/client-form';
import { SearchQuery } from '@models/api/index';
import { ClientFindByRequest } from '@models/api/client-api.model';
import { ModalService } from '@services/modal/modal.service';
import { ClientDetailComponent } from './client-detail/client-detail.component';

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
  public modalService = inject(ModalService);
  public searchQuery = signal<SearchQuery<ClientFindByRequest>>(
    new SearchQuery({ limit: 6, page: 1 }),
  );

  clientsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) => this.clientService.getPaginated(params),
  });

  changePage(page: number) {
    this.searchQuery.update((c) => c.clone({ page }));
  }

  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Nombre Completo' },
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

  async handleDelete(client: Client) {
    const confirmed = await this.modalService.openConfirm({
      title: 'Eliminar Cliente',
      message: `¿Estás seguro de borrar a ${client.name}?`,
      confirmText: 'Sí, borrar',
      cancelText: 'No, mantener',
    });

    if (confirmed) {
      this.clientService.delete(client.id).subscribe({
        next: () => this.clientsResource.reload(),
      });
    }
  }

  handleView(client: Client) {
    this.modalService.open({
      component: ClientDetailComponent,
      title: `Detalle: ${client.name}`,
      size: 'md',
      data: { client },
    });
  }
}
