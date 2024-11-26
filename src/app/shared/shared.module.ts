import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SharedTableComponent } from './shared-table/shared-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardComponent,
    SharedTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CardComponent,
    SharedTableComponent
  ]
})
export class SharedModule { }
