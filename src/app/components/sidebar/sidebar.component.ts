import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavItem } from '@models/components/navbar.model';
import { AuthService } from '@services/index';
import { AnIconComponent } from '@components/index';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, AnIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  public currentUser = this.authService.currentUser;

  public readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/', icon: 'grid' },
    { label: 'Citas', route: '/citas', icon: 'calendar' },
    { label: 'Clientes', route: '/clientes', icon: 'users' },
    { label: 'Servicios', route: '/servicios', icon: 'star' },
    { label: 'Reportes', route: '/reportes', icon: 'bar-chart' },
  ];

  logout() {
    this.authService.logout();
  }
}
