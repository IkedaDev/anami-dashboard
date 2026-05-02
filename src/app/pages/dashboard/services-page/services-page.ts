import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AnCardStatsComponent, AnDrawerComponent, AnPaginationComponent } from '@components/index';
import { AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Service, AnTableColumn } from '@models/index';
import { servicesFake } from '../../../../data/mock-data';
import { ServicesService } from '../../../services/index';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    AnDrawerComponent,
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    CurrencyPipe,
  ],
  templateUrl: './services-page.html',
})
export class ServicesPage {
  public services = signal<Service[]>(servicesFake);
  private servicesService = inject(ServicesService);
  public selectedService = this.servicesService.selectedService;

  public isDrawerOpen = signal(false);
  public drawerTitle = signal('Nuevo Servicio');
  public page = signal(1);

  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Servicio' },
    { key: 'price', label: 'Precio' },
    { key: 'duration', label: 'Duración' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  openNewService() {
    this.selectedService.set(null);
    this.drawerTitle.set('Nuevo Servicio');
    this.isDrawerOpen.set(true);
  }

  saveService() {
    this.servicesService.saveService();
  }

  handleEdit(service: Service) {
    this.selectedService.set({ ...service });
    this.drawerTitle.set('Editar Servicio');
    this.isDrawerOpen.set(true);
  }
}
