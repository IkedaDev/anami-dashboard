import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class AnDrawerComponent {
  // Inputs con Signals
  title = input.required<string>();
  subtitle = input<string>('');
  isOpen = input.required<boolean>();

  // Evento de cierre
  close = output<void>();

  // Manejo de scroll del body para que no se mueva al estar abierto el drawer
  private lockScroll = effect(() => {
    if (this.isOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
}
