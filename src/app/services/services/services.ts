import { Injectable, signal } from '@angular/core';
import { Service } from '@models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  public selectedService = signal<Service | null>(null);

  saveService() {
    const data = this.selectedService();
    if (!data) return;

    if (data.id) {
      console.log('Editando servicio', data);
      return;
    }

    console.log('Creando servicio');
  }
}
