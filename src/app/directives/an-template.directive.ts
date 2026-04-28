import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[anTemplate]',
  standalone: true,
})
export class AnTemplateDirective {
  @Input('anTemplate') name: string = '';
  public template = inject(TemplateRef);
}
