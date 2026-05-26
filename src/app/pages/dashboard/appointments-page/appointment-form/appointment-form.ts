import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client, Service, Appointment } from '@models/business/index';
import { SearchQuery } from '@models/api';
import { AppointmentPageService, ClientService, ServiceService, DrawerService, ToastService } from '@services/index';
import { useFormUtils } from '@utils/form.utils';
import { finalize } from 'rxjs';
import { NoteEditorComponent } from '@components/note-editor/note-editor.component';

@Component({
  selector: 'app-appointment-form',
  imports: [CommonModule, ReactiveFormsModule, NoteEditorComponent],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss',
})
export class AppointmentForm implements OnInit {
  private fb = inject(FormBuilder);
  public appointmentPageService = inject(AppointmentPageService);
  public clientService = inject(ClientService);
  public serviceService = inject(ServiceService);
  public toast = inject(ToastService);
  public drawer = inject(DrawerService);

  public clients = signal<Client[]>([]);
  public services = signal<Service[]>([]);
  public selectedServiceIds = signal<string[]>([]);
  public isSaving = signal(false);

  public appointmentForm = this.fb.group({
    clientId: ['', [Validators.required]],
    startsAt: ['', [Validators.required]],
    locationType: ['PARTICULAR', [Validators.required]],
    durationMinutes: [20],
    hasNailCut: [false],
    status: ['SCHEDULED'],
    notes: ['', [Validators.maxLength(300)]],
  });

  public formUtils = useFormUtils(this.appointmentForm);

  ngOnInit(): void {
    // Cargar clientes para el dropdown (límite 100 para simplificar)
    this.clientService.getPaginated(new SearchQuery({ pagination: { page: 1, limit: 100 } })).subscribe({
      next: (res) => this.clients.set(res.data),
    });

    // Cargar servicios para la cita particular (límite 100)
    this.serviceService.getPaginated(new SearchQuery({ pagination: { page: 1, limit: 100 } })).subscribe({
      next: (res) => this.services.set(res.data),
    });

    const selected = this.appointmentPageService.selectedAppointment();
    if (selected) {
      this.appointmentForm.patchValue({
        clientId: selected.clientId,
        startsAt: this.formatDateForInput(selected.startsAt),
        locationType: selected.locationType,
        durationMinutes: selected.durationMinutes || 20,
        hasNailCut: selected.hasNailCut || false,
        status: selected.status,
        notes: selected.notes || '',
      });

      if (selected.items) {
        const ids = selected.items.map(item => item.serviceId).filter(Boolean) as string[];
        this.selectedServiceIds.set(ids);
      }
    }
  }

  formatDateForInput(dateInput: Date | string): string {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onServiceChange(event: Event, serviceId: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedServiceIds.update((current) => {
      if (isChecked) {
        return [...current, serviceId];
      } else {
        return current.filter((id) => id !== serviceId);
      }
    });
  }

  isServiceSelected(serviceId: string): boolean {
    return this.selectedServiceIds().includes(serviceId);
  }

  saveAppointment() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const rawForm = this.appointmentForm.getRawValue();

    // Validar regla de negocio de citas particulares
    if (rawForm.locationType === 'PARTICULAR' && this.selectedServiceIds().length === 0) {
      this.toast.show('Debe seleccionar al menos un servicio para citas particulares.', 'error');
      return;
    }

    const startsAtDate = new Date(rawForm.startsAt!);
    if (isNaN(startsAtDate.getTime())) {
      this.toast.show('Fecha seleccionada inválida.', 'error');
      return;
    }

    const payload: any = {
      clientId: rawForm.clientId,
      startsAt: startsAtDate.toISOString(),
      locationType: rawForm.locationType,
      notes: rawForm.notes,
    };

    if (rawForm.locationType === 'PARTICULAR') {
      payload.serviceIds = this.selectedServiceIds();
      // Opcionalmente pasar durationMinutes calculado si lo requiere la interfaz,
      // pero el backend se encarga de recalcularlo.
    } else {
      payload.durationMinutes = Number(rawForm.durationMinutes);
      payload.hasNailCut = !!rawForm.hasNailCut;
      payload.serviceIds = [];
    }

    const selected = this.appointmentPageService.selectedAppointment();
    if (selected) {
      payload.status = rawForm.status;
    }

    const request$ = selected
      ? this.appointmentPageService.update(selected.id, payload)
      : this.appointmentPageService.create(payload);

    this.isSaving.set(true);

    request$.pipe(finalize(() => this.isSaving.set(false))).subscribe({
      next: () => {
        this.drawer.close();
        this.appointmentPageService.appointmentsResource.reload();
      },
    });
  }
}
