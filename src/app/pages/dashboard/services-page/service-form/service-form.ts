import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '@models/business';
import { DrawerService, ServicePageService } from '@services/index';
import { useFormUtils } from '@utils/form.utils';

@Component({
  selector: 'app-service-form',
  imports: [ReactiveFormsModule],
  templateUrl: './service-form.html',
  styleUrl: './service-form.scss',
})
export class ServiceForm implements OnInit {
  public service = inject(ServicePageService);
  public drawer = inject(DrawerService);
  public data = input();
  public serviceForm = inject(FormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(0)]],
    duration: [0, [Validators.required, Validators.min(0)]],
    isActive: [true],
  });

  public formUtils = useFormUtils(this.serviceForm);

  ngOnInit(): void {
    if (this.service.selectedService()) {
      this.serviceForm.patchValue(this.service.selectedService() as Service);
    }
  }

  saveService() {
    // if (this.serviceForm.invalid) {
    //   this.serviceForm.markAllAsTouched();
    //   return;
    // }
    // const formData = this.serviceForm.getRawValue() as Service;
    // this.service.selectedService.set(formData);
    // this.service.save();
    // this.isDrawerOpen.set(false);
    // console.log('Servicio procesado con éxito:', formData.name);
  }
}
