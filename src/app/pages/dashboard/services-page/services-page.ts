import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AnCardStatsComponent, AnPaginationComponent } from '@components/index';
import { AnTableComponent } from '@components/index';
import { AnTemplateDirective } from '@directives/an-template.directive';
import { Service, AnTableColumn } from '@models/index';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    AnTableComponent,
    CommonModule,
    AnTemplateDirective,
    AnPaginationComponent,
    AnCardStatsComponent,
    CurrencyPipe,
  ],
  templateUrl: './services-page.html',
})
export class ServicesPage {
  // Columnas para la gestión de servicios
  public columns = signal<AnTableColumn[]>([
    { key: 'name', label: 'Servicio' },
    { key: 'price', label: 'Precio' },
    { key: 'duration', label: 'Duración' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ]);

  // Data Mock basada en tu oferta real
  public services = signal<Service[]>([
    {
      id: '1',
      name: 'Masaje Descontracturante',
      description: 'Masaje profundo para liberar tensión muscular',
      price: 35000,
      duration: 60,
      isActive: true,
    },
    {
      id: '2',
      name: 'Piedras Calientes',
      description: 'Relajación profunda con piedras volcánicas',
      price: 45000,
      duration: 90,
      isActive: true,
    },
    {
      id: '3',
      name: 'Limpieza Facial Express',
      description: 'Tratamiento rápido de hidratación',
      price: 25000,
      duration: 30,
      isActive: false,
    },
  ]);

  public page = signal(1);

  handleEdit(service: Service) {
    console.log('Editando servicio:', service.name);
  }
}
