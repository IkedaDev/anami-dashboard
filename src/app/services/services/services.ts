import { Injectable, signal } from '@angular/core';
import { Service } from '@models/service.model';

@Injectable({
  providedIn: 'root',
})
export class Services {
  public isModalOpen = signal(false);
  public modalTitle = signal('Nuevo Servicio');

  // Formulario en estado (Signal para el objeto que editamos)
  public selectedService = signal<Service | null>(null);

  openNewService() {
    this.selectedService.set({
      id: '',
      name: '',
      price: 0,
      duration: 30,
      isActive: true,
    });
    this.modalTitle.set('Nuevo Servicio');
    this.isModalOpen.set(true);
  }

  handleEdit(service: Service) {
    this.selectedService.set({ ...service });
    this.modalTitle.set('Editar Servicio');
    this.isModalOpen.set(true);
  }

  saveService() {
    const data = this.selectedService();
    console.log('Guardando en BD Prisma:', data);
    this.isModalOpen.set(false);
  }
}
