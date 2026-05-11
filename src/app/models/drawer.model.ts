import { Type } from '@angular/core';

export interface DrawerConfig {
  component: Type<any>;
  subtitle?: string;
  data?: any;
  title?: string;
}
