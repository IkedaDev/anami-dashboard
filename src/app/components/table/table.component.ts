import { Component, ContentChildren, input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnTableColumn } from '@models/table.model';
import { AnTemplateDirective } from '@directives/index';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: [],
})
export class AnTableComponent {
  columns = input.required<AnTableColumn[]>();
  data = input.required<any[]>();
  loading = input<boolean>(false);

  @ContentChildren(AnTemplateDirective, { descendants: true })
  templates!: QueryList<AnTemplateDirective>;

  getTemplate(name: string) {
    return this.templates?.find((t) => t.name === name)?.template;
  }
}
