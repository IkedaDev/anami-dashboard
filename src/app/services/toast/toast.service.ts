import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();

  show(message: string, type: ToastType = 'info') {
    const id = Date.now();
    const newToast: Toast = { id, message, type };
    this.toastsSignal.update((toasts) => [...toasts, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: number) {
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
