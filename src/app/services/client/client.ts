import { Injectable, signal } from '@angular/core';
import { clientsFake } from '../../../data/mock-data';
import { Client } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public clients = signal<Client[]>(clientsFake);
  public selectedClient = signal<Client | null>(null);

  get() {
    return this.clients;
  }

  save() {
    const data = this.selectedClient();
    if (!data) return;

    if (data.id) {
      console.log('IkedaDev Log: Actualizando cliente', data);
      // Aquí iría la lógica para actualizar en el array (o API futura)
      return;
    }

    console.log('IkedaDev Log: Creando nuevo cliente');
  }
}
