import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '@models/index';
import { ClientService, DrawerService } from '@services/index';
import { useFormUtils } from '@utils/form.utils';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm implements OnInit {
  private fb = inject(FormBuilder);
  public clientService = inject(ClientService);
  public drawer = inject(DrawerService);
  public data = input();

  public clientForm = this.fb.group({
    id: [''],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    rut: ['', [Validators.required]],
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
    this.clientService.selectedClient.set(formData);
    this.clientService.save();
  }
}
