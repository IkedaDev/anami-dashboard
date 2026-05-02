import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AnCardStatsComponent, AnDrawerComponent, AnPaginationComponent } from '@components/index';
import { AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Service, AnTableColumn } from '@models/index';

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
  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Servicio' },
    { key: 'price', label: 'Precio' },
    { key: 'duration', label: 'Duración' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  public services = signal<Service[]>([
    {
      id: '1',
      name: 'Masaje Descontracturante',
      description: 'Masaje profundo para liberar tensión muscular acumulada.',
      price: 35000,
      duration: 60,
      isActive: true,
    },
    {
      id: '2',
      name: 'Piedras Calientes',
      description: 'Terapia relajante con piedras volcánicas y aceites esenciales.',
      price: 45000,
      duration: 90,
      isActive: true,
    },
    {
      id: '3',
      name: 'Limpieza Facial Express',
      description: 'Tratamiento rápido de hidratación y exfoliación.',
      price: 25000,
      duration: 30,
      isActive: false,
    },
  ]);

  public modalTitle = signal('Nuevo Servicio');
  public selectedService = signal<Service | null>(null);
  public page = signal(1);

  openNewService() {
    this.selectedService.set({
      id: '',
      name: '',
      description: '',
      price: 0,
      duration: 30,
      isActive: true,
    });
    this.modalTitle.set('Nuevo Servicio');
  }

  saveService() {
    const data = this.selectedService();
    if (!data) return;

    console.log('Persistiendo en Base de Datos SQL:', data);
  }

  toggleStatus(service: Service) {
    service.isActive = !service.isActive;
    console.log(`Servicio ${service.name} ahora está ${service.isActive ? 'Activo' : 'Inactivo'}`);
  }

  public isDrawerOpen = signal(false);
  public drawerTitle = signal('Nuevo Servicio');

  handleEdit(service: Service) {
    this.selectedService.set({ ...service });
    this.drawerTitle.set('Editar Servicio');
    this.isDrawerOpen.set(true);
  }

  save() {
    // Lógica Prisma / Query...
    this.isDrawerOpen.set(false);
  }
}
