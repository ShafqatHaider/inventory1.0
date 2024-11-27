import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inp-select',
  templateUrl: './inp-select.component.html',
  styleUrl: './inp-select.component.scss'
})
export class InpSelectComponent {
  @Input() bindLabel: string = '';
  @Input() label: string = '';
  @Input() items: any[] = [];
  @Input() bindValue: any;

  
  @Input() selected: any;

  
  @Output() selectedChange = new EventEmitter<any>();

  selectedValue: any;

  onSelectVal(event: any): void {
    debugger
    this.selected = event; 
    this.selectedChange.emit(event)
  }
}
