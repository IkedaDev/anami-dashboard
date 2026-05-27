import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, DashboardMetrics } from '@models/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private readonly URL = `${environment.apiUrl}/dashboard`;

  getMetrics(referenceDate?: string) {
    const params: Record<string, string> = {};
    if (referenceDate) {
      params['referenceDate'] = referenceDate;
    }
    return this.http.get<ApiResponse<DashboardMetrics>>(`${this.URL}/metrics`, { params });
  }
}
