// src/app/shared/components/an-card-stats/an-card-stats.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'an-card-stats',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './card-stats.component.scss',
  templateUrl: './card-stats.component.html',
})
export class AnCardStatsComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  icon = input<string>('an-icon-default');
  trend = input<string>();
  trendDirection = input<'up' | 'down' | 'neutral'>('neutral');
  loading = input<boolean>(false);
  trendLabel = input<string>();
}
