import { inject, Injectable, signal } from '@angular/core';
import { clientsFake } from '../../../data/mock-data';
import { Client } from '@models/business/index';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse } from '@models/api';
import { ClientFindByRequest } from '@models/api/client-api.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private readonly URL = `${environment.apiUrl}/clients`;

  public clients = signal<Client[]>(clientsFake);
  public selectedClient = signal<Client | null>(null);

  getPaginated(req: ClientFindByRequest) {
    let params = new HttpParams()
      .set('page', req.params.page.toString())
      .set('limit', req.params.limit.toString());

    return this.http.post<PaginatedResponse<Client>>(
      `${this.URL}/paginated`,
      {
        body: req.body,
      },
      { params },
    );
  }

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

  create(client: Partial<Client>) {
    return this.http.post<ApiResponse<Client>>(this.URL, client);
  }
}
