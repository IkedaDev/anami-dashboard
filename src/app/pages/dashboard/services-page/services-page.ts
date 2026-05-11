import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AnCardStatsComponent, AnPaginationComponent } from '@components/index';
import { AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Service, AnTableColumn } from '@models/index';
import { ServicesService } from '../../../services/index';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { useFormUtils } from '@utils/index';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './services-page.html',
})
export class ServicesPage {
  public service = inject(ServicesService);
  public services = this.service.get();

  public isDrawerOpen = signal(false);
  public drawerTitle = signal('Nuevo Servicio');
  public page = signal(1);

  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Servicio' },
    { key: 'price', label: 'Precio' },
    { key: 'duration', label: 'Duración' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  public serviceForm = inject(FormBuilder).group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(0)]],
    duration: [30, [Validators.required]],
    isActive: [true],
  });

  public formUtils = useFormUtils(this.serviceForm);

  openNewService() {
    this.service.selectedService.set(null);
    this.serviceForm.reset({ price: 0, duration: 30, isActive: true });
    this.drawerTitle.set('Nuevo Servicio');
    this.isDrawerOpen.set(true);
  }

  saveService() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }
    const formData = this.serviceForm.getRawValue() as Service;
    this.service.selectedService.set(formData);
    this.service.save();
    this.isDrawerOpen.set(false);
    console.log('Servicio procesado con éxito:', formData.name);
  }

  handleEdit(service: Service) {
    this.service.selectedService.set({ ...service });
    this.serviceForm.patchValue(service);
    this.drawerTitle.set('Editar Servicio');
    this.isDrawerOpen.set(true);
  }
}
