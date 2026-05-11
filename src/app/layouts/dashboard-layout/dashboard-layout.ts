import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@components/index';
import { ToastContainer } from '@components/toast-container/toast-container.component';
import { DrawerContainer } from '@components/drawer/drawer.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SidebarComponent, ToastContainer, DrawerContainer],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {}
