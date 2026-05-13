import { inject, Injectable, signal } from '@angular/core';
import { Client } from '@models/business/index';
import { SearchQuery } from '@models/api';
import { ClientFindByRequest } from '@models/api/client-api.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClientService } from './client.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';
import { ModalService } from '@services/modal/modal.service';
import { DrawerService } from '@services/drawer/drawer.service';

@Injectable({
  providedIn: 'root',
})
export class ClientPageService {
  private clientService = inject(ClientService);
  private toast = inject(ToastService);
  public selectedClient = signal<Client | null>(null);
  public modalService = inject(ModalService);
  public drawerService = inject(DrawerService);

  public searchQuery = signal<SearchQuery<ClientFindByRequest>>(
    new SearchQuery({ limit: 6, page: 1 }),
  );

  clientsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) => this.clientService.getPaginated(params),
  });

  changePage(page: number) {
    this.searchQuery.update((c) => c.clone({ page }));
  }

  async handleDelete(client: Client) {
    const confirmed = await this.modalService.openConfirm({
      title: 'Eliminar Cliente',
      message: `¿Estás seguro de borrar a ${client.name}?`,
      confirmText: 'Sí, borrar',
      cancelText: 'No, mantener',
    });

    if (confirmed) {
      this.clientService
        .delete(client.id)
        .pipe(
          tap(({ success }) => {
            if (success) {
              this.toast.show(`Cliente eliminado`, 'success');
            }
          }),
          catchError((ex) => {
            this.toast.show('Ha ocurrido un error', 'error');
            return throwError(() => ex);
          }),
        )
        .subscribe({
          next: () => this.clientsResource.reload(),
        });
    }
  }

  create(client: Omit<Partial<Client>, 'id'>) {
    return this.clientService.create(client).pipe(
      tap(() => this.toast.show('Cliente agregado', 'success')),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, client: Omit<Partial<Client>, 'id'>) {
    return this.clientService.update(id, client).pipe(
      tap(() => {
        this.toast.show('Cliente modificado', 'success');
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }
}
