import { Component, input } from '@angular/core';

@Component({
  selector: 'an-icon',
  standalone: true,
  template: `
    <i
      [class]="'ri-' + name() + ' ' + extraClass()"
      [style.font-size.px]="size()"
      [style.color]="color()"
    >
    </i>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class AnIconComponent {
  name = input.required<string>(); // Ej: 'user-line', 'calendar-2-line'
  size = input<number>(16);
  color = input<string>('currentColor');
  extraClass = input<string>('');
}
