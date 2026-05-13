import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '@models/business/client.model';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './client.detail.component.scss',
  template: `
    <div class="client-detail">
      <div class="an-grid">
        <section>
          <h4 class="an-text--h4 an-mb-3">Información Personal</h4>
          <div class="client-details-section">
            <div class="an-field">
              <label class="an-label">Nombre Completo</label>
              <p class="an-text--body">{{ client().name || 'No registrado' }}</p>
            </div>
            <div class="an-field">
              <label class="an-label">RUT</label>
              <p class="an-text--body">{{ client().rut || 'No registrado' }}</p>
            </div>
          </div>
        </section>

        <!-- <hr class="an-my-2" style="border: 0; border-top: 1px solid var(--an-border-color);" /> -->

        <section>
          <h4 class="an-text--h4 an-mb-3">Contacto</h4>
          <div class="client-details-section">
            <div class="an-field">
              <label class="an-label">Email</label>
              <p class="an-text--body">{{ client().email || 'No registrado' }}</p>
            </div>
            <div class="an-field">
              <label class="an-label">Teléfono</label>
              <p class="an-text--body">{{ client().phone || 'No registrado' }}</p>
            </div>
          </div>
        </section>
        <section>
          <h4 class="an-text--h4 an-mb-3">Notas</h4>
          <p class="an-text--body">{{ client().notes || 'No registrado' }}</p>
        </section>
      </div>
    </div>
  `,
})
export class ClientDetailComponent {
  // Recibimos el cliente mediante un input reactivo (Signal)
  client = input.required<Client>();
}
