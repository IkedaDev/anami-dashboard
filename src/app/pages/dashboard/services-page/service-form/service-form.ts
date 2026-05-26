import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '@models/business';
import { DrawerService, ServicePageService } from '@services/index';
import { useFormUtils } from '@utils/form.utils';
import { finalize } from 'rxjs';

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
  public isSaving = signal(false);

  public serviceForm = inject(FormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(0)]],
    duration: [0, [Validators.required, Validators.min(0)]],
    available: [true],
  });

  public formUtils = useFormUtils(this.serviceForm);

  ngOnInit(): void {
    if (this.service.selectedService()) {
      this.serviceForm.patchValue(this.service.selectedService() as Service);
    }
  }

  saveService() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }
    const formData = this.serviceForm.getRawValue() as any as Service;

    const request$ = this.service.selectedService()
      ? this.service.update(this.service.selectedService()!.id, formData)
      : this.service.create(formData);

    this.isSaving.set(true);

    request$.pipe(finalize(() => this.isSaving.set(false))).subscribe({
      next: () => this.drawer.close(),
    });
  }
}
