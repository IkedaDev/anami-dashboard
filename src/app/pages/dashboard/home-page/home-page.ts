import { Component, signal, computed, inject, resource } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AnCardStatsComponent, AnChartComponent, AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/index';
import { ApexOptions } from 'ng-apexcharts';
import { DashboardService } from '@services/index';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    AnCardStatsComponent,
    AnChartComponent,
    AnTableComponent,
    AnTemplateDirective,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);

  // Track referenceDate parameter to easily simulation-test with seed data
  public referenceDate = signal<string | undefined>(undefined);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const refDate = params['referenceDate'];
      this.referenceDate.set(refDate);
    });
  }

  // Load general dashboard metrics from backend
  public metricsResource = resource({
    params: () => ({ referenceDate: this.referenceDate() }),
    loader: ({ params }) => firstValueFrom(this.dashboardService.getMetrics(params.referenceDate)),
  });

  // --- Stats del Negocio (Computed from API resource) ---
  public totalRevenue = computed(() => this.metricsResource.value()?.data?.totalRevenue ?? 0);
  public appointmentsToday = computed(() => this.metricsResource.value()?.data?.appointmentsToday ?? 0);
  public newClients = computed(() => this.metricsResource.value()?.data?.newClients ?? 0);

  // --- Próximas Citas (Data para la Tabla - Mock) ---
  public upcomingAppointments = signal([
    {
      id: '1',
      startsAt: new Date(),
      client: { name: 'Sebastian Ikeda' },
      locationType: 'HOTEL',
      status: 'SCHEDULED',
    },
    {
      id: '2',
      startsAt: new Date(Date.now() + 3600000),
      client: { name: 'Ana María' },
      locationType: 'STUDIO',
      status: 'SCHEDULED',
    },
    {
      id: '3',
      startsAt: new Date(Date.now() + 7200000),
      client: { name: 'Carlos Pérez' },
      locationType: 'PARTICULAR',
      status: 'SCHEDULED',
    },
  ]);

  public tableColumns = signal([
    { key: 'startsAt', label: 'Hora' },
    { key: 'client', label: 'Cliente' },
    { key: 'locationType', label: 'Lugar' },
    { key: 'actions', label: '' },
  ]);

  // --- Configuración de Gráficos (Computed to update dynamically) ---
  public salesChartOptions = computed<ApexOptions>(() => {
    const weeklyData = this.metricsResource.value()?.data?.weeklyRevenue ?? [0, 0, 0, 0, 0, 0, 0];
    return {
      series: [{ name: 'Ingresos', data: weeklyData }],
      chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily: 'Outfit' },
      colors: ['#D4A373'], // Color marca Anami
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] },
    };
  });

  public revenueSplitOptions = computed<ApexOptions>(() => {
    const split = this.metricsResource.value()?.data?.revenueSplit;
    const anamiShare = split?.anamiShare ?? 0;
    const hotelShare = split?.hotelShare ?? 0;
    const seriesData = anamiShare === 0 && hotelShare === 0 ? [0, 0] : [anamiShare, hotelShare];

    return {
      series: seriesData,
      labels: ['Anami Share', 'Hotel Share'],
      chart: { type: 'donut', height: 280, fontFamily: 'Outfit' },
      colors: ['#D4A373', '#c47f6b'],
      legend: { position: 'bottom' },
    };
  });
}

