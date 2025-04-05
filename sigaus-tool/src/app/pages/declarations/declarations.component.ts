import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { GestionService } from '../../core/services/gestion.service';
import { Declaration } from '../../core/interfaces/declaration.interface';

interface Tab {
  header: string;
}

@Component({
  selector: 'app-declarations',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    
    ButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})
export class DeclarationsComponent implements OnInit {
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
  
  // Años y meses para filtros
  availableYears = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 }
  ];
  
  availableMonths = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 }
  ];

  declarations: Declaration[] = []; // Variable para almacenar las declaraciones
  loading = false; // Variable para mostrar el spinner de carga

  constructor(
    private readonly gestionService: GestionService
  ) {}

  ngOnInit(): void {
    // Cargar las declaraciones al inicializar el componente
    this.loadDeclarations();
  }

  loadDeclarations(): void {
    this.loading = true;
    
    this.gestionService.getDeclarations().subscribe({
      next: (response) => {
        this.declarations = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar declaraciones:', error);
        this.loading = false;
      }
    });
  }

  // Método para manejar cambios en los filtros
  applyFilters(filters: any): void {
    console.log('Aplicando filtros:', filters);
    this.gestionService.filterDeclarations(filters).subscribe({
      next: (filteredData) => {
        this.declarations = filteredData;
      },
      error: (error) => {
        console.error('Error al filtrar declaraciones:', error);
      }
    });
  }
}
