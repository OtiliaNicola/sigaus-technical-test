import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Declaration } from '../../core/interfaces/declaration.interface';
import { GestionService } from '../../core/services/gestion.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() data: Declaration[] = [];
  @Input() loading: boolean = false;

  entriesCount = 0;
  entriesWeight = 0;
  exitsCount = 0;
  exitsWeight = 0;

  constructor(private gestionService: GestionService) {}

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
    this.entriesWeight = entries.reduce(
      (sum, item) => sum + this.extractWeight(item.quantity),
      0
    );

    // Calcular salidas
    const exits = this.data.filter((item) => item.type === 'SALIDA');
    this.exitsCount = exits.length;
    this.exitsWeight = exits.reduce(
      (sum, item) => sum + this.extractWeight(item.quantity),
      0
    );
  }

  // Función auxiliar para extraer el peso de un string como "100 kg"
  private extractWeight(cantidad: string): number {
    if (!cantidad) return 0;
    const match = cantidad.toLowerCase().match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // Método para exportar a Excel
  exportToExcel(): void {
    this.gestionService.exportToExcel(this.data);
  }
}
