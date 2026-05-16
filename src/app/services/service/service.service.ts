import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse, SearchQuery } from '@models/api';
import { Service } from '@models/business';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private http = inject(HttpClient);
  private readonly URL = `${environment.apiUrl}/services`;

  getPaginated(req: SearchQuery) {
    return this.http.post<PaginatedResponse<any>>(`${this.URL}/paginated`, req).pipe(
      map((req) => ({
        ...req,
        data: req.data.map(
          (s) =>
            ({
              ...s,
              price: s.basePrice,
              duration: s.durationMin,
            }) as Service,
        ),
      })),
    );
  }

  create(service: Omit<Partial<Service>, 'id'>) {
    return this.http.post<ApiResponse<Service>>(this.URL, service).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, service: Omit<Partial<Service>, 'id'>) {
    return this.http.patch<ApiResponse<Service>>(`${this.URL}/${id}`, service).pipe(
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
