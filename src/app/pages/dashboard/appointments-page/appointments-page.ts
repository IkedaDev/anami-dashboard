import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, resource, signal, HostListener } from '@angular/core';
import { AnTableComponent, AnPaginationComponent, AnCardStatsComponent, AnIconComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Appointment } from '@models/business/appoinment.model';
import { AnTableColumn } from '@models/components/table.model';
import { AppointmentPageService, DrawerService, DashboardService } from '@services/index';
import { AppointmentForm } from './appointment-form/appointment-form';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-appointments-page',
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    AnIconComponent,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './appointments-page.html',
  styleUrl: './appointments-page.scss',
})
export class AppointmentsPage implements OnInit {
  public appointmentPageService = inject(AppointmentPageService);
  public drawerService = inject(DrawerService);
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);

  public activeDropdown = signal<string | null>(null);

  @HostListener('document:click')
  closeDropdown() {
    this.activeDropdown.set(null);
  }

  toggleDropdown(id: string, event: Event) {
    event.stopPropagation();
    if (this.activeDropdown() === id) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(id);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['openDrawer'] === 'true') {
        this.openNewAppointment();
      }
    });
  }

  public appointmentsResource = this.appointmentPageService.appointmentsResource;
  public searchQuery = this.appointmentPageService.searchQuery;
  public changePage = this.appointmentPageService.changePage;

  public metricsResource = resource({
    loader: () => firstValueFrom(this.dashboardService.getMetrics()),
  });

  // Columnas configuradas para los nuevos modelos
  public columns = signal<AnTableColumn[]>([
    { key: 'startsAt', label: 'Fecha y Hora' },
    { key: 'client', label: 'Cliente' },
    { key: 'items', label: 'Servicios' },
    { key: 'totalPrice', label: 'Total' },
    { key: 'locationType', label: 'Ubicación' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  openNewAppointment() {
    this.appointmentPageService.selectedAppointment.set(null);
    this.drawerService.open({ title: 'Agendar Cita', component: AppointmentForm });
  }

  handleEdit(appointment: Appointment) {
    this.appointmentPageService.selectedAppointment.set({ ...appointment });
    this.drawerService.open({
      title: 'Editar Cita',
      component: AppointmentForm,
    });
  }

  onCancel(appointment: Appointment) {
    this.appointmentPageService.handleDelete(appointment);
  }

  onComplete(appointment: Appointment) {
    this.appointmentPageService.update(appointment.id, { status: 'COMPLETED' }).subscribe({
      next: () => {
        this.appointmentsResource.reload();
        this.metricsResource.reload();
      },
    });
  }

  onNoShow(appointment: Appointment) {
    this.appointmentPageService.update(appointment.id, { status: 'NO_SHOW' }).subscribe({
      next: () => {
        this.appointmentsResource.reload();
        this.metricsResource.reload();
      },
    });
  }
}
