import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FilterComponent } from '../../shared/filter/filter.component';


interface Tab {
  header: string;
}

@Component({
  selector: 'app-declaraciones',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    DataTableComponent,
    ButtonModule
  ],
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})
export class DeclaracionesComponent {
  // Array de tabs
  tabs: Tab[] = [
    { header: 'DECLARACIONES' },
    { header: 'HISTÓRICO DE ARCHIVOS' },
    { header: 'INSTALACIONES GESTOR' },
    { header: 'INCIDENCIAS' },
    { header: 'FINANCIACIÓN' },
    { header: 'DOCUMENTACIÓN' }
  ];
  
  // Tab activa
  activeTabIndex = 0;
  
  // Método para cambiar de tab
  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
  
  // Datos de ejemplo para la tabla
  declaracionesData: any[] = [
    {
      id: 1,
      referencia: 'Nuevo del año',
      tipo: 'entrada',
      fecha: '07/01/2025',
      origen: 'ALBACETE',
      regenerable: 'Regenerable',
      ler: '130109',
      cantidad: '681 kg',
      oleado: '1',
      pdfVinc: true
    },
    // Más datos...
  ];
  
  // Años y meses para filtros
  availableYears = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 }
  ];
  
  availableMonths = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    // Más meses...
  ];
  
  // Método para manejar cambios en los filtros
  applyFilters(filters: any): void {
    console.log('Aplicando filtros:', filters);
    // Aquí iría la lógica de filtrado
  }
}
