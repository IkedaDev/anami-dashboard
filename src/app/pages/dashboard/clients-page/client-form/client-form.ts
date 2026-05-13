import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '@models/business/index';
import { ClientService, DrawerService, ToastService } from '@services/index';
import { useFormUtils } from '@utils/form.utils';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm implements OnInit {
  private fb = inject(FormBuilder);
  public clientService = inject(ClientService);
  public toast = inject(ToastService);
  public drawer = inject(DrawerService);
  public data = input();
  public isSaving = signal(false);
  public clientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    rut: ['', []],
    email: ['', [Validators.email]],
    phone: [''],
    address: [''],
    notes: ['', [Validators.maxLength(300)]],
  });

  public formUtils = useFormUtils(this.clientForm);

  ngOnInit(): void {
    if (this.clientService.selectedClient()) {
      this.clientForm.patchValue(this.clientService.selectedClient() as Client);
    }
  }

  saveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    const formData = this.clientForm.getRawValue() as Client;

    const request$ = this.clientService.selectedClient()
      ? this.clientService.update(this.clientService.selectedClient()!.id, formData)
      : this.clientService.create(formData);

    this.isSaving.set(true);

    request$.pipe(finalize(() => this.isSaving.set(false))).subscribe({
      next: () => this.drawer.close(),
    });
  }
}
