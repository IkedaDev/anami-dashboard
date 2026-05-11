import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DrawerService } from '@services/drawer/drawer.service';
import { AnIconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-drawer-container',
  imports: [CommonModule, AnIconComponent],
  templateUrl: './drawer-container.component.html',
  styleUrl: './drawer-container.component.scss',
})
export class DrawerContainer {
  public drawer = inject(DrawerService);
}
