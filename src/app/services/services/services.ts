import { Injectable, signal } from '@angular/core';
import { Service } from '@models/business/service.model';
import { servicesFake } from '../../../data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  public services = signal<Service[]>(servicesFake);
  public selectedService = signal<Service | null>(null);

  get() {
    return this.services;
  }

  save() {
    const data = this.selectedService();
    if (!data) return;

    if (data.id) {
      console.log('Editando servicio', data);
      return;
    }

    console.log('Creando servicio');
  }
}
