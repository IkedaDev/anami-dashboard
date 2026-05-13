import { inject, Injectable, signal } from '@angular/core';
import { clientsFake } from '../../../data/mock-data';
import { Client } from '@models/business/index';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse, SearchQuery } from '@models/api';
import { ClientFindByRequest } from '@models/api/client-api.model';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly URL = `${environment.apiUrl}/clients`;

  public selectedClient = signal<Client | null>(null);

  getPaginated(req: SearchQuery<ClientFindByRequest>) {
    return this.http.post<PaginatedResponse<Client>>(`${this.URL}/paginated`, req.body, {
      params: req.getParams(),
    });
  }

  create(client: Omit<Partial<Client>, 'id'>) {
    return this.http.post<ApiResponse<Client>>(this.URL, client).pipe(
      tap(() => this.toast.show('Cliente agregado', 'success')),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, client: Omit<Partial<Client>, 'id'>) {
    return this.http.patch<ApiResponse<Client>>(`${this.URL}/${id}`, client).pipe(
      tap(() => {
        this.toast.show('Cliente modificado', 'success');
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<boolean>>(`${this.URL}/${id}`).pipe(
      tap(({ success }) => {
        if (success) {
          this.toast.show(`Cliente eliminado`, 'success');
        }
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }
}
