import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AnCardStatsComponent,
  AnTableComponent,
  AnPaginationComponent,
  AnDrawerComponent,
} from '@components/index';
import { AnTemplateDirective } from '@directives/index';
import { AnTableColumn, Client } from '@models/index';
import { ClientService } from '@services/client/client';
import { useFormUtils } from '@utils/form.utils';

@Component({
  selector: 'app-clients-page',
  imports: [
    AnTableComponent,
    CommonModule,
    AnDrawerComponent,
    ReactiveFormsModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage {
  private fb = inject(FormBuilder);
  public clientService = inject(ClientService);

  public clients = this.clientService.get();
  public isDrawerOpen = signal(false);
  public drawerTitle = signal('Nuevo Cliente');
  public page = signal(1);

  // Formulario con validaciones profesionales
  public clientForm = this.fb.group({
    id: [''],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    rut: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: [''],
    address: [''],
    notes: ['', [Validators.maxLength(300)]],
  });

  public formUtils = useFormUtils(this.clientForm);

  public columns = signal<AnTableColumn[]>([
    { key: 'fullName', label: 'Nombre Completo' },
    { key: 'rut', label: 'RUT' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'actions', label: 'Acciones' },
  ]);

  openNewClient() {
    this.clientService.selectedClient.set(null);
    this.clientForm.reset();
    this.drawerTitle.set('Nuevo Cliente');
    this.isDrawerOpen.set(true);
  }

  handleEdit(client: Client) {
    this.clientService.selectedClient.set({ ...client });
    this.clientForm.patchValue(client);
    this.drawerTitle.set('Editar Cliente');
    this.isDrawerOpen.set(true);
  }

  saveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    const formData = this.clientForm.getRawValue() as Client;
    this.clientService.selectedClient.set(formData);
    this.clientService.save();
    this.isDrawerOpen.set(false);
  }
}
