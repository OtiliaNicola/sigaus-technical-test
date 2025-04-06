import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() years: any[] = [];
  @Input() months: any[] = [];
  @Output() filterChanged = new EventEmitter<any>();
  
  selectedYear: number = 2025;
  selectedMonth: number | null = null;
  referenceNumber: string = '';

  ngOnInit(): void {
    // Emitir los filtros iniciales al cargar el componente
    this.onFilterChange();
  }
  
  onFilterChange(): void {
    this.filterChanged.emit({
      year: this.selectedYear,
      month: this.selectedMonth,
      reference: this.referenceNumber
    });
  }

  clearYear(): void {
    this.selectedYear = 2025;
    this.onFilterChange();
  }

  clearMonth(): void {
    this.selectedMonth = null;
    this.onFilterChange();
  }

  clearReference(): void {
    this.referenceNumber = '';
    this.onFilterChange();
  }
}