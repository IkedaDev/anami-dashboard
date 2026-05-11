import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AnCardStatsComponent,
  AnTableComponent,
  AnPaginationComponent,
  AnDrawerComponent,
  AnIconComponent,
} from '@components/index';
import { AnTemplateDirective } from '@directives/index';
import { AnTableColumn, Client } from '@models/index';
import { ClientService } from '@services/client/client';
import { useFormUtils } from '@utils/form.utils';
import { rxResource } from '@angular/core/rxjs-interop';
import { ToastService } from '@services/index';

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
    AnIconComponent,
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage {
  private fb = inject(FormBuilder);
  public clientService = inject(ClientService);
  public isDrawerOpen = signal(false);
  public drawerTitle = signal('Nuevo Cliente');
  public searchQuery = signal<string>('');
  public currentPage = signal<number>(1);
  public limit = signal<number>(6);

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

  clientsResource = rxResource({
    params: () => ({
      page: this.currentPage(),
      limit: this.limit(),
      q: this.searchQuery(),
    }),
    stream: ({ params }) => this.clientService.getPaginated(params.page, params.limit, params.q),
  });

  changePage(newPage: number) {
    this.currentPage.set(newPage);
  }

  public columns = signal<AnTableColumn[]>([
    { key: 'fullName', label: 'Nombre Completo' },
    { key: 'rut', label: 'RUT' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'actions', label: 'Acciones' },
  ]);

  private toast = inject(ToastService);

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

  handleDelete(client: Client) {
    this.toast.show(`${client.fullName} se ha eliminado`, 'success');
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
