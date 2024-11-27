import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss',
  standalone:false
})
export class SharedTableComponent {
  @Input() tableTitle: string = 'Table Title';
  @Input() tableHeaders: string[] = [];
  @Input() tableKeys: string[] = [];
  @Input() tableData: any[] = [];
  @Input() dateFields: string[] = []; 
  @Output() newClick = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() addNewClick = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Input() isAction :boolean=false;
  @Input() isNewAction :boolean=false;
  @Input() btnTitle = '';
  filterText: any; 
  filteredData: any[] = [];
  @Input() isReturnButton=false;
isLoading=false;
isNotData=false;
  constructor(private filterService: FilterService, private pipe:DatePipe) {}

  ngOnInit() {
    debugger
    this.isLoading=true
    if(this.tableData){
      
        
        this.filteredData = [...this.tableData];
        this.isLoading=false
      
    }
    else{
      this.isLoading=false;
      this.isNotData=true;
      
    }
    
  }
  transformData(row: any, key: string): any {
    if (this.dateFields.includes(key)) {
      return this.pipe.transform(row[key], 'dd-MM-yyyy'); 
    }
    return row[key];
  }
  ngOnChanges() {
    this.applyFilter(); // Reapply filter when data changes
  }

  onNewClick() {
    this.newClick.emit();
  }
  onAddNewClick() {
    this.addNewClick.emit();
  }



  applyFilter() {
    this.filteredData = this.filterService.filterData(
      this.tableData,
      this.filterText,
      this.tableKeys
    );
  }

  editRow(id: number) {
    this.edit.emit(id);
  }

  deleteRow(id: number) {
    this.delete.emit(id);
  }
}
