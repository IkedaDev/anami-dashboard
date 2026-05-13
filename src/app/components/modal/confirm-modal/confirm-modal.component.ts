import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@services/modal/modal.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="an-confirm-modal">
      <div class="an-p-4">
        <p class="an-text--body">{{ message() }}</p>
      </div>

      <footer class="an-confirm-modal__footer">
        <button class="an-button an-button--outline an-button--sm" (click)="onCancel()">
          {{ cancelText() }}
        </button>
        <button class="an-button an-button--danger an-button--sm" (click)="onConfirm()">
          {{ confirmText() }}
        </button>
      </footer>
    </div>
  `,
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  private modalService = inject(ModalService);

  message = input.required<string>();
  confirmText = input<string>('Confirmar');
  cancelText = input<string>('Cancelar');

  resolve = input.required<(result: boolean) => void>();
  modalId = input.required<string>();

  onConfirm() {
    this.resolve()(true);
    this.modalService.close(this.modalId());
  }

  onCancel() {
    this.resolve()(false);
    this.modalService.close(this.modalId());
  }
}
