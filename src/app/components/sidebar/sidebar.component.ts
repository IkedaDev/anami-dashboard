// src/app/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavItem } from '@models/navbar.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/', icon: 'grid' },
    { label: 'Citas', route: '/citas', icon: 'calendar' },
    { label: 'Clientes', route: '/clientes', icon: 'users' },
    { label: 'Servicios', route: '/servicios', icon: 'star' },
    { label: 'Reportes', route: '/reportes', icon: 'bar-chart' },
  ];
}
