import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Declaration } from '../interfaces/declaration.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private mocksUrl = 'assets/mocks/';
  // Datos de ejemplo para la tabla de declaraciones

  constructor(
    private readonly http: HttpClient
  ) {}

  getDeclarations(): Observable<Declaration[]> {
    // Simulación de una llamada HTTP para obtener datos de declaraciones
    return this.http.get<Declaration[]>(`${this.mocksUrl}gestion.mock.json`);
  }

  filterDeclarations(filters: any): Observable<Declaration[]> {
    return this.getDeclarations().pipe(
      map(response => {
        let filteredData = [...response];
        
        // Filtrar por referencia
        if (filters.reference) {
          const searchTerm = filters.reference.toLowerCase();
          filteredData = filteredData.filter(item => 
            item.reference.toLowerCase().includes(searchTerm)
          );
        }
        
        // Filtrar por mes (extrayendo el mes de la fecha)
        if (filters.month) {
          filteredData = filteredData.filter(item => {
            const dateParts = item.date.split('/');
            if (dateParts.length >= 2) {
              const itemMonth = parseInt(dateParts[1]);
              return itemMonth === filters.month;
            }
            return false;
          });
        }
        
        // Filtrar por año (extrayendo el año de la fecha)
        if (filters.year) {
          filteredData = filteredData.filter(item => {
            const dateParts = item.date.split('/');
            if (dateParts.length >= 3) {
              const itemYear = parseInt(dateParts[2]);
              return itemYear === filters.year;
            }
            return false;
          });
        }
        
        return filteredData;
        
      })
    );
  }

  calculateStatistics(declarations: Declaration[]): {
    entries: { count: number; weight: number };
    exits: { count: number; weight: number };
  } {
    const entries = declarations.filter(item => item.type === 'ENTRADA');
    const exits = declarations.filter(item => item.type === 'SALIDA');
    
    const entriesWeight = this.calculateTotalWeight(entries);
    const exitsWeight = this.calculateTotalWeight(exits);
    
    return {
      entries: { count: entries.length, weight: entriesWeight },
      exits: { count: exits.length, weight: exitsWeight }
    };
  }

  private calculateTotalWeight(declarations: Declaration[]): number {
    return declarations.reduce((total, item) => {
      // Extraer el valor numérico del peso (ej: "888 kg" -> 888)
      const match = item.quantity.toLowerCase().match(/(\d+)/);
      const weight = match ? parseInt(match[1]) : 0;
      return total + weight;
    }, 0);
  }

  exportToExcel(declarations: Declaration[]): void {
    console.log('Exportando a Excel:', declarations);
    alert('Función de exportación a Excel (simulada)');
  }
}
