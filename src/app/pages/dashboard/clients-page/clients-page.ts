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
import { DrawerService } from '@services/drawer/drawer.service';
import { ClientForm } from './client-form/client-form';
import { ModalService } from '@services/modal/modal.service';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientPageService } from '@services/index';

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
  public clientPageService = inject(ClientPageService);
  public drawerService = inject(DrawerService);
  public modalService = inject(ModalService);

  public clientsResource = this.clientPageService.clientsResource;
  public metricsResource = this.clientPageService.metricsResource;
  public searchQuery = this.clientPageService.searchQuery;
  public changePage = this.clientPageService.changePage;


  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Nombre Completo' },
    { key: 'rut', label: 'RUT' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'actions', label: 'Acciones' },
  ]);

  private searchTimeout?: number;

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.clientPageService.applySearch(term);
    }, 400);
  }

  openNewClient() {
    this.clientPageService.selectedClient.set(null);
    this.drawerService.open({ title: 'Nuevo Cliente', component: ClientForm });
  }

  handleEdit(client: Client) {
    this.clientPageService.selectedClient.set({ ...client });
    this.drawerService.open({
      title: 'Editar Cliente',
      component: ClientForm,
    });
  }

  handleDelete(client: Client) {
    this.clientPageService.handleDelete(client);
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
