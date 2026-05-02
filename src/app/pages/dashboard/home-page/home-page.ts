import { Component, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AnCardStatsComponent, AnChartComponent, AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/index';
import { ApexOptions } from 'ng-apexcharts';

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
  // --- Stats del Negocio ---
  public totalRevenue = signal(450000);
  public appointmentsToday = signal(6);
  public newClients = signal(12);

  // --- Próximas Citas (Data para la Tabla) ---
  public upcomingAppointments = signal([
    {
      id: '1',
      startsAt: new Date(),
      client: { fullName: 'Sebastian Ikeda' },
      locationType: 'HOTEL',
      status: 'SCHEDULED',
    },
    {
      id: '2',
      startsAt: new Date(Date.now() + 3600000),
      client: { fullName: 'Ana María' },
      locationType: 'STUDIO',
      status: 'SCHEDULED',
    },
    {
      id: '3',
      startsAt: new Date(Date.now() + 7200000),
      client: { fullName: 'Carlos Pérez' },
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

  // --- Configuración de Gráficos ---
  public salesChartOptions: ApexOptions = {
    series: [{ name: 'Ingresos', data: [30, 40, 35, 50, 49, 60, 70] }],
    chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily: 'Outfit' },
    colors: ['#D4A373'], // Color marca Anami
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] },
  };

  public revenueSplitOptions: ApexOptions = {
    series: [280000, 170000],
    labels: ['Anami Share', 'Hotel Share'],
    chart: { type: 'donut', height: 280, fontFamily: 'Outfit' },
    colors: ['#D4A373', '#c47f6b'],
    legend: { position: 'bottom' },
  };
}
