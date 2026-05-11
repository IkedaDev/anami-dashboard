import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AnIconComponent } from '@components/icon/icon.component';
import { ToastService } from '@services/toast/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [AnIconComponent, CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainer {
  protected toastService = inject(ToastService);
}
