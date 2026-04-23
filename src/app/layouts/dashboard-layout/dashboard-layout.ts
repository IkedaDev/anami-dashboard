import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/index';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {}
