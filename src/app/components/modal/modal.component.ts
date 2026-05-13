import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@services/modal/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (modal of modalService.activeModals(); track modal.id; let i = $index) {
      <div
        class="an-modal-overlay"
        [class.--stacked]="i > 0"
        [style.z-index]="1000 + i"
        (click)="modal.closeOnOverlayClick && modalService.close(modal.id)"
      >
        <div class="an-modal" [class]="'--' + modal.size" (click)="$event.stopPropagation()">
          <header class="an-modal__header" [class.--sm]="modal.size == 'sm'">
            <h3 class="an-text--h3 an-m-0">{{ modal.title }}</h3>
            <button
              class="an-button"
              [class.an-button--sm]="modal.size == 'sm'"
              (click)="modalService.close(modal.id)"
            >
              ✕
            </button>
          </header>

          <div class="an-modal__body">
            <ng-container *ngComponentOutlet="modal.component; inputs: modal.data" />
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './modal.component.scss', // Aquí definiremos los tamaños
})
export class ModalComponent {
  protected modalService = inject(ModalService);
}
