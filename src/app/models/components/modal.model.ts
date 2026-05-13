import { Type } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalConfig {
  component: Type<any>;
  title: string;
  data?: any;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
}

export interface ModalInstance extends ModalConfig {
  id: string;
}
