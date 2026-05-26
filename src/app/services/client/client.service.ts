import { inject, Injectable } from '@angular/core';
import { Client } from '@models/business/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, ClientMetrics, PaginatedResponse, SearchQuery } from '@models/api';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private readonly URL = `${environment.apiUrl}/clients`;

  getMetrics() {
    return this.http.get<ApiResponse<ClientMetrics>>(`${this.URL}/metrics`);
  }

  getPaginated(req: SearchQuery) {
    return this.http.post<PaginatedResponse<Client>>(`${this.URL}/paginated`, req);
  }

  create(client: Omit<Partial<Client>, 'id'>) {
    return this.http.post<ApiResponse<Client>>(this.URL, client).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, client: Omit<Partial<Client>, 'id'>) {
    return this.http.patch<ApiResponse<Client>>(`${this.URL}/${id}`, client).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<boolean>>(`${this.URL}/${id}`).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }
}
