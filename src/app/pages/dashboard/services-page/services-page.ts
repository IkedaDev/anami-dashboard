import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AnCardStatsComponent, AnPaginationComponent, AnIconComponent } from '@components/index';
import { AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { AnTableColumn } from '@models/components';
import { ReactiveFormsModule } from '@angular/forms';
import { DrawerService, ServicePageService } from '@services/index';
import { ModalService } from '@services/modal/modal.service';
import { ServiceForm } from './service-form/service-form';
import { Service } from '@models/business';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    ReactiveFormsModule,
    AnIconComponent,
  ],
  templateUrl: './services-page.html',
})
export class ServicesPage {
  public service = inject(ServicePageService);
  public drawerService = inject(DrawerService);
  public modalService = inject(ModalService);

  public servicesResource = this.service.servicesResource;
  public metricsResource = this.service.metricsResource;
  public searchQuery = this.service.searchQuery;
  public changePage = this.service.changePage;


  private searchTimeout?: number;

  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Servicio' },
    { key: 'price', label: 'Precio' },
    { key: 'duration', label: 'Duración' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.service.applySearch(term);
    }, 400);
  }

  openNewService() {
    this.service.selectedService.set(null);
    this.drawerService.open({ title: 'Nuevo Servicio', component: ServiceForm });
  }

  handleEdit(service: Service) {
    this.service.selectedService.set({ ...service });
    this.drawerService.open({
      title: 'Editar Servicio',
      component: ServiceForm,
    });
  }
  handleDelete(service: Service) {
    this.service.handleDelete(service);
  }
}
