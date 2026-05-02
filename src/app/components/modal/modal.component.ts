import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (isOpen()) {
      <div class="an-modal-overlay" (click)="close.emit()">
        <div class="an-modal" (click)="$event.stopPropagation()">
          <header class="an-modal__header">
            <h3 class="an-text--h3 an-m-0">{{ title() }}</h3>
            <button class="an-button --icon-only" (click)="close.emit()">✕</button>
          </header>

          <div class="an-modal__body">
            <ng-content></ng-content>
          </div>

          <footer class="an-modal__footer">
            <ng-content select="[footer]"></ng-content>
          </footer>
        </div>
      </div>
    }
  `,
})
export class AnModalComponent {
  title = input.required<string>();
  isOpen = input.required<boolean>();
  close = output<void>();
}
