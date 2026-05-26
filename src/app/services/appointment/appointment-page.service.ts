import { inject, Injectable, resource, signal } from '@angular/core';
import { Appointment } from '@models/business/index';
import { SearchQuery } from '@models/api';
import { AppointmentService } from './appointment.service';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';
import { ModalService } from '@services/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentPageService {
  private appointmentService = inject(AppointmentService);
  private toast = inject(ToastService);
  public modalService = inject(ModalService);
  public selectedAppointment = signal<Appointment | null>(null);

  public searchQuery = signal<SearchQuery>(new SearchQuery({ pagination: { limit: 10, page: 1 } }));

  appointmentsResource = resource({
    params: () => this.searchQuery(),
    loader: ({ params }) => firstValueFrom(this.appointmentService.getPaginated(params)),
  });

  changePage(page: number) {
    this.searchQuery.update((c) => c.clone({ pagination: { ...c.pagination, page } }));
  }

  async handleDelete(appointment: Appointment) {
    const confirmed = await this.modalService.openConfirm({
      title: 'Anular Cita',
      message: `¿Estás seguro de anular la cita de ${appointment.client?.fullName || appointment.client?.name || 'Cliente'}?`,
      confirmText: 'Sí, anular',
      cancelText: 'No, mantener',
    });

    if (confirmed) {
      this.appointmentService
        .delete(appointment.id)
        .pipe(
          tap(({ success }) => {
            if (success) {
              this.toast.show(`Cita anulada`, 'success');
            }
          }),
          catchError((ex) => {
            this.toast.show('Ha ocurrido un error al anular la cita', 'error');
            return throwError(() => ex);
          }),
        )
        .subscribe({
          next: () => this.appointmentsResource.reload(),
        });
    }
  }

  create(appointment: any) {
    return this.appointmentService.create(appointment).pipe(
      tap(() => this.toast.show('Cita agendada', 'success')),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error al agendar la cita', 'error');
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, appointment: any) {
    return this.appointmentService.update(id, appointment).pipe(
      tap(() => {
        this.toast.show('Cita modificada', 'success');
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error al modificar la cita', 'error');
        return throwError(() => ex);
      }),
    );
  }
}
