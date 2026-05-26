import { inject, Injectable, resource, signal } from '@angular/core';
import { Client } from '@models/business/index';
import { SearchQuery } from '@models/api';
import { ClientService } from './client.service';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';
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

  public searchQuery = signal<SearchQuery>(new SearchQuery({ pagination: { limit: 6, page: 1 } }));

  clientsResource = resource({
    params: () => this.searchQuery(),
    loader: ({ params }) => firstValueFrom(this.clientService.getPaginated(params)),
  });

  metricsResource = resource({
    loader: () => firstValueFrom(this.clientService.getMetrics()),
  });

  changePage(page: number) {
    this.searchQuery.update((c) => c.clone({ pagination: { ...c.pagination, page } }));
  }

  applySearch(term: string) {
    this.searchQuery.update((current) =>
      current.clone({
        ...current,
        filters: [
          {
            logic: 'OR',
            filters: [
              { field: 'name', operator: 'CONTAINS', value: term },
              { field: 'rut', operator: 'CONTAINS', value: term },
              { field: 'email', operator: 'CONTAINS', value: term },
            ],
          },
        ],
      }),
    );
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
          next: () => {
            this.clientsResource.reload();
            this.metricsResource.reload();
          },
        });
    }
  }

  create(client: Omit<Partial<Client>, 'id'>) {
    return this.clientService.create(client).pipe(
      tap(() => {
        this.toast.show('Cliente agregado', 'success');
        this.clientsResource.reload();
        this.metricsResource.reload();
      }),
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
        this.clientsResource.reload();
        this.metricsResource.reload();
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }
}

