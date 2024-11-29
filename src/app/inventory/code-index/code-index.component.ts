import { Component, OnInit } from '@angular/core';
import { InventoryConfigurations } from '../supportive/InventoryConfigurations';

@Component({
  selector: 'app-code-index',
  templateUrl: './code-index.component.html',
  styleUrl: './code-index.component.scss'
})
export class CodeIndexComponent implements OnInit{
config= InventoryConfigurations.code;

ngOnInit(): void {
  this.config.data
}
add(){}
edit(){}
delete(){}
}
