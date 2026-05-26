import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AnTableComponent, AnPaginationComponent, AnCardStatsComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Appointment } from '@models/business/appoinment.model';
import { AnTableColumn } from '@models/components/table.model';
import { AppointmentPageService, DrawerService } from '@services/index';
import { AppointmentForm } from './appointment-form/appointment-form';

@Component({
  selector: 'app-appointments-page',
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './appointments-page.html',
})
export class AppointmentsPage {
  public appointmentPageService = inject(AppointmentPageService);
  public drawerService = inject(DrawerService);

  public appointmentsResource = this.appointmentPageService.appointmentsResource;
  public searchQuery = this.appointmentPageService.searchQuery;
  public changePage = this.appointmentPageService.changePage;

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
}
