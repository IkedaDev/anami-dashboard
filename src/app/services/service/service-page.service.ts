import { inject, Injectable, resource, signal } from '@angular/core';
import { Service } from '@models/business/index';
import { SearchQuery } from '@models/api';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';
import { ModalService } from '@services/modal/modal.service';
import { DrawerService } from '@services/drawer/drawer.service';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root',
})
export class ServicePageService {
  private serviceService = inject(ServiceService);
  private toast = inject(ToastService);
  public selectedService = signal<Service | null>(null);
  public modalService = inject(ModalService);
  public drawerService = inject(DrawerService);

  public searchQuery = signal<SearchQuery>(new SearchQuery({ pagination: { limit: 6, page: 1 } }));

  servicesResource = resource({
    params: () => this.searchQuery(),
    loader: ({ params }) => firstValueFrom(this.serviceService.getPaginated(params)),
  });

  metricsResource = resource({
    loader: () => firstValueFrom(this.serviceService.getMetrics()),
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
            filters: [{ field: 'name', operator: 'CONTAINS', value: term }],
          },
        ],
      }),
    );
  }

  async handleDelete(service: Service) {
    const confirmed = await this.modalService.openConfirm({
      title: 'Eliminar Servicio',
      message: `¿Estás seguro de borrar ${service.name}?`,
      confirmText: 'Sí, borrar',
      cancelText: 'No, mantener',
    });

    if (confirmed) {
      this.serviceService
        .delete(service.id)
        .pipe(
          tap(({ success }) => {
            if (success) {
              this.toast.show(`Servicio eliminado`, 'success');
            }
          }),
          catchError((ex) => {
            this.toast.show('Ha ocurrido un error', 'error');
            return throwError(() => ex);
          }),
        )
        .subscribe({
          next: () => {
            this.servicesResource.reload();
            this.metricsResource.reload();
          },
        });
    }
  }

  create(service: Omit<Partial<Service>, 'id'>) {
    return this.serviceService.create(service).pipe(
      tap(() => {
        this.toast.show('Servicio agregado', 'success');
        this.servicesResource.reload();
        this.metricsResource.reload();
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }

  update(id: string, service: Omit<Partial<Service>, 'id'>) {
    return this.serviceService.update(id, service).pipe(
      tap(() => {
        this.toast.show('Servicio modificado', 'success');
        this.servicesResource.reload();
        this.metricsResource.reload();
      }),
      catchError((ex) => {
        this.toast.show('Ha ocurrido un error', 'error');
        return throwError(() => ex);
      }),
    );
  }
}

