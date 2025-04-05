import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() data: any[] = [];
  
  get entradasCount(): number {
    return this.data.filter(item => item.tipo === 'entrada').length;
  }
  
  get salidasCount(): number {
    return this.data.filter(item => item.tipo === 'salida').length;
  }
  
  get entradasWeight(): number {
    return this.data
      .filter(item => item.tipo === 'entrada')
      .reduce((sum, item) => sum + this.extractWeight(item.cantidad), 0);
  }
  
  get salidasWeight(): number {
    return this.data
      .filter(item => item.tipo === 'salida')
      .reduce((sum, item) => sum + this.extractWeight(item.cantidad), 0);
  }
  
  // Función auxiliar para extraer el peso de un string como "100 kg"
  private extractWeight(cantidad: string): number {
    const match = cantidad.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}