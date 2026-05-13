import { Injectable, signal } from '@angular/core';
import { ConfirmModalComponent } from '@components/modal/confirm-modal/confirm-modal.component';
import { ModalConfig, ModalInstance } from '@models/components/modal.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalsSignal = signal<ModalInstance[]>([]);
  public activeModals = this.modalsSignal.asReadonly();

  open(config: ModalConfig) {
    const id = crypto.randomUUID();
    const newModal: ModalInstance = {
      ...config,
      id,
      size: config.size ?? 'md',
      closeOnOverlayClick: config.closeOnOverlayClick ?? true,
    };

    this.modalsSignal.update((modals) => [...modals, newModal]);
    return id;
  }

  close(id: string) {
    this.modalsSignal.update((modals) => modals.filter((m) => m.id !== id));
  }

  closeLatest() {
    this.modalsSignal.update((modals) => modals.slice(0, -1));
  }

  openConfirm(config: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }): Promise<boolean> {
    return new Promise((resolve) => {
      const modalId = crypto.randomUUID();

      const modalConfig: ModalConfig = {
        component: ConfirmModalComponent,
        title: config.title ?? 'Confirmar acción',
        size: 'sm',
        closeOnOverlayClick: false,
        data: {
          message: config.message,
          confirmText: config.confirmText ?? 'Confirmar',
          cancelText: config.cancelText ?? 'Cancelar',
          modalId: modalId,
          resolve: (result: boolean) => resolve(result),
        },
      };

      this.modalsSignal.update((modals) => [...modals, { ...modalConfig, id: modalId }]);
    });
  }
}
