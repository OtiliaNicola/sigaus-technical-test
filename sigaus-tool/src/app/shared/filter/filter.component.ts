import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() years: any[] = [];
  @Input() months: any[] = [];
  @Output() filterChanged = new EventEmitter<any>();
  
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  referenceNumber: string = '';
  
  onFilterChange(): void {
    this.filterChanged.emit({
      year: this.selectedYear,
      month: this.selectedMonth,
      reference: this.referenceNumber
    });
  }
}