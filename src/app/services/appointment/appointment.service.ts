import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse, SearchQuery } from '@models/api';
import { Appointment, AppointmentItem } from '@models/business';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private readonly URL = `${environment.apiUrl}/appointments`;

  getPaginated(req: SearchQuery): Observable<PaginatedResponse<Appointment>> {
    const params: { [key: string]: string } = {
      page: req.pagination.page.toString(),
      limit: req.pagination.limit.toString(),
    };

    return this.http.get<PaginatedResponse<any>>(`${this.URL}/paginated`, { params }).pipe(
      tap(response => {
        console.log(response)
        return response
      }),
      map(response => ({
        ...response, data: response.data.map(appoinment => ({
          id: appoinment.id,
          anamiShare: appoinment.anamiShare,
          hotelShare: appoinment.hotelShare,
          startsAt: new Date(appoinment.startsAt),
          status: appoinment.status,
          totalPrice: appoinment.totalPrice,
          locationType: appoinment.locationType,
          clientId: appoinment.clientId,
          client: {
            id: appoinment.clientId,
            name: appoinment.clientName,
          },
          items: appoinment.items.map((i: any) => ({
            service: {
              name: i.serviceName,
              price: i.serviceAtTime
            },
            id: i.id,
            serviceId: i.serviceId
          } as AppointmentItem)),
          durationMinutes: appoinment.durationMinutes,
          hasNailCut: appoinment.hasNailCut,
          notes: appoinment.notes,
          createdAt: appoinment.createdAt,
          updatedAt: appoinment.updatedAt,
        } as Appointment))
      }))
    );
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
