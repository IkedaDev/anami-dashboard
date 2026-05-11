import { Injectable, signal } from '@angular/core';
import { DrawerConfig } from '@models/components';

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private configSignal = signal<DrawerConfig | null>(null);

  config = this.configSignal.asReadonly();

  open(config: DrawerConfig) {
    this.configSignal.set(config);
  }

  close() {
    this.configSignal.set(null);
  }
}
