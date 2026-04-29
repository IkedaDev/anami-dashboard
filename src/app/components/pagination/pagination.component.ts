// src/app/shared/components/an-pagination/an-pagination.component.ts
import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class AnPaginationComponent {
  totalItems = input.required<number>();
  pageSize = input<number>(10);
  currentPage = input<number>(1);
  showInfo = input<boolean>(false);

  pageChange = output<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  pages = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
