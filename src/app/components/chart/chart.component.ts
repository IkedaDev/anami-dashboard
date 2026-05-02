import { Component, input } from '@angular/core';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <div class="an-chart-wrapper">
      <apx-chart
        [series]="options().series!"
        [chart]="options().chart!"
        [xaxis]="options().xaxis!"
        [stroke]="options().stroke!"
        [colors]="options().colors!"
        [labels]="options().labels!"
        [legend]="options().legend!"
        [dataLabels]="options().dataLabels!"
        [plotOptions]="options().plotOptions!"
        [tooltip]="options().tooltip!"
      ></apx-chart>
    </div>
  `,
  styles: [
    `
      .an-chart-wrapper {
        width: 100%;
        padding: 1rem;
      }
    `,
  ],
})
export class AnChartComponent {
  options = input.required<ApexOptions>();
}
