import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Declaration } from '../../core/interfaces/declaration.interface';
import { GestionService } from '../../core/services/gestion.service';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    MatIconModule,
    PaginatorModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() data: Declaration[] = [];
  @Input() loading: boolean = false;
  @ViewChild('dt') table: Table | undefined;

  entriesCount = 0;
  entriesWeight = 0;
  exitsCount = 0;
  exitsWeight = 0;

  selectedDeclarations!: Declaration;

  constructor(private readonly gestionService: GestionService) {}

  ngOnInit(): void {
    this.calculateStatistics();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Recalcular estadísticas cuando cambian los datos
    if (changes['data']) {
      this.calculateStatistics();
    }
  }

  private calculateStatistics(): void {
    // Calcular entradas
    const entries = this.data.filter((item) => item.type === 'ENTRADA');
    this.entriesCount = entries.length;
    this.entriesWeight = entries.reduce((sum, item) => sum + item.quantity, 0);

    // Calcular salidas
    const exits = this.data.filter((item) => item.type === 'SALIDA');
    this.exitsCount = exits.length;
    this.exitsWeight = exits.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Método para exportar a Excel
  exportToExcel(): void {
    this.gestionService.exportToExcel(this.data);
  }

  getStartRecord(): number {
    return (this.table?.first ?? 0) + 1;
  }
  getEndRecord(): number {
    if (!this.table) return 0;
    return (this.table?.first ?? 0) + (this.table?.rows ?? 0) >
      (this.table?.totalRecords ?? 0)
      ? this.table?.totalRecords ?? 0
      : (this.table?.first ?? 0) + (this.table?.rows ?? 0);
  }

  getTotalRecords(): number {
    return this.table ? this.table.totalRecords : 0;
  }
}
