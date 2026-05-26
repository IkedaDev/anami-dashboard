import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse, SearchQuery } from '@models/api';
import { Appointment } from '@models/business';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private readonly URL = `${environment.apiUrl}/appointments`;

  getPaginated(req: SearchQuery) {
    const params: { [key: string]: string } = {
      page: req.pagination.page.toString(),
      limit: req.pagination.limit.toString(),
    };

    return this.http.get<PaginatedResponse<Appointment>>(`${this.URL}/paginated`, { params });
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<boolean>>(`${this.URL}/${id}`).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }

  create(appointment: Partial<Appointment> & { serviceIds?: string[] }) {
    return this.http.post<ApiResponse<Appointment>>(this.URL, appointment).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, appointment: Partial<Appointment> & { serviceIds?: string[] }) {
    return this.http.patch<ApiResponse<Appointment>>(`${this.URL}/${id}`, appointment).pipe(
      catchError((ex) => {
        return throwError(() => ex);
      }),
    );
  }
}
